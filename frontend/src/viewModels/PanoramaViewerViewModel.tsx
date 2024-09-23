// react
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// global state
import {
  selectLastSphereId,
  selectLayerId,
  selectMarkerId,
  selectSphereId,
  setIsMarkerModalOpen,
  toggleSidebar,
} from '../store/slices/viewerSlice';
import { RootState } from '../store/store';
// model
import { PanoramaViewerModel } from '../models/PanoramaViewerModel';
import { Orientation } from '../types/map';
// utils
import ReactDOMServer from 'react-dom/server';
import { CustomTooltip } from '../components/molecules/CustomTooltip';
import { getOrientation } from '../utils/viewerUtils';

export const usePanoramaViewerViewModel = (isDesktop: boolean) => {
  const dispatch = useDispatch();
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const panoramaViewerModelRef = useRef<PanoramaViewerModel | null>(null);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.viewer.isSidebarOpen
  );
  const isMarkerModalOpen = useSelector(
    (state: RootState) => state.viewer.isMarkerModalOpen
  );
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const lastSelectedSphereId = useSelector(
    (state: RootState) => state.viewer.lastSelectedSphereId
  );
  const selectedSphereId = useSelector(
    (state: RootState) => state.viewer.selectedSphereId
  );
  const selectedMarkerId = useSelector(
    (state: RootState) => state.viewer.selectedMarkerId
  );
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const markerDataList = useSelector(
    (state: RootState) => state.viewer.markerDataList
  );
  const [currentOrientation, setCurrentOrientation] = useState<Orientation>({
    yaw: 0.0,
    pitch: 0.0,
  });

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // 選択されたマーカーのデータ
  const selectedMarkerData = markerDataList.find(
    (marker) => marker.id === selectedMarkerId
  );

  // ツールチップの内容をView側で作成
  const markerTooltipContents = markerDataList.reduce(
    (contents, marker) => {
      const tooltipContent = ReactDOMServer.renderToStaticMarkup(
        <CustomTooltip markerData={marker} key={marker.id} />
      );
      contents[marker.id] = tooltipContent;
      return contents;
    },
    {} as { [key: string]: string }
  );

  // Viewerの初期化
  useEffect(() => {
    if (!viewerRef.current) return;

    panoramaViewerModelRef.current = new PanoramaViewerModel();
    panoramaViewerModelRef.current.initializeViewer(
      viewerRef.current,
      isDesktop
    );

    // ビューアのイベントリスナーを設定
    const viewerInstance = panoramaViewerModelRef.current.viewerInstance;
    const mapPlugin = panoramaViewerModelRef.current.mapPlugin;
    const markersPlugin = panoramaViewerModelRef.current.markersPlugin;

    // マーカークリック時の処理
    markersPlugin?.addEventListener('select-marker', ({ marker }) => {
      // マーカーがSphereかどうか判定
      const selectedSphere = sphereDataList.find(
        (sphere) => sphere.id === marker.id
      );
      if (selectedSphere) {
        dispatch(selectSphereId(marker.id));
        dispatch(selectMarkerId(null));
        return;
      }
      // マーカーがMarkerかどうか判定
      const selectedMarker = markerDataList.find(
        (_marker) => _marker.id === marker.id
      );
      if (selectedMarker) {
        dispatch(selectMarkerId(marker.id));
        dispatch(setIsMarkerModalOpen(true));
      }
    });

    // ホットスポットクリック時の処理
    mapPlugin?.addEventListener('select-hotspot', ({ hotspotId }) => {
      dispatch(selectSphereId(hotspotId));
    });

    // YawとPitchの更新（デスクトップのみ）
    if (isDesktop) {
      const updateOrientation = () => {
        const orientation = getOrientation(viewerInstance);
        setCurrentOrientation({ ...orientation });
        requestAnimationFrame(updateOrientation);
      };
      updateOrientation();
    }

    return () => {
      viewerInstance?.destroy();
    };
  }, [markerDataList, sphereDataList, layerDataList, isDesktop]);

  // Layerの変更時
  // 監視対象: selectedLayerId, layerDataList
  useEffect(() => {
    if (!selectedLayerId || !panoramaViewerModelRef.current) return;

    const selectedLayer = layerDataList.find(
      (layer) => layer.id === selectedLayerId
    );
    if (!selectedLayer) return;

    panoramaViewerModelRef.current.handleLayerChange(
      selectedLayer,
      sphereDataList
    );
  }, [selectedLayerId, layerDataList, sphereDataList]);

  // Sphereの変更時
  // 監視対象: selectedSphereId, sphereDataList, markerDataList, layerDataList
  useEffect(() => {
    if (!selectedSphereId || !panoramaViewerModelRef.current) return;

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === selectedSphereId
    );
    if (!selectedSphere) return;

    const lastSelectedSphere = sphereDataList.find(
      (sphere) => sphere.id === lastSelectedSphereId
    );

    const selectedLayer = layerDataList.find(
      (layer) => layer.id === selectedSphere.layerId
    );
    if (!selectedLayer) return;

    const layerChanged = selectedLayerId !== selectedLayer.id;

    if (layerChanged) {
      dispatch(selectLayerId(selectedLayerId));
    }

    panoramaViewerModelRef.current.handleSphereChange(
      selectedSphere,
      lastSelectedSphere || null,
      layerChanged
    );

    dispatch(selectLastSphereId(selectedSphere.id));

    // マーカーとマップの更新
    panoramaViewerModelRef.current.updateMarkersAndMap(
      selectedSphere,
      sphereDataList,
      markerDataList,
      markerTooltipContents
    );
  }, [selectedSphereId, markerDataList, sphereDataList, layerDataList]);

  // Markerの変更時
  // 監視対象: selectedMarkerId, markerDataList
  useEffect(() => {
    if (!selectedMarkerId || !panoramaViewerModelRef.current) return;

    const selectedMarker = markerDataList.find(
      (marker) => marker.id === selectedMarkerId
    );
    if (!selectedMarker) return;

    panoramaViewerModelRef.current.handleMarkerChange(selectedMarker);
  }, [selectedMarkerId, markerDataList]);

  // MarkerModalを閉じる処理
  const handleCloseMarkerModal = () => {
    dispatch(setIsMarkerModalOpen(false));
  };

  return {
    viewerRef,
    currentOrientation,
    isSidebarOpen,
    isMarkerModalOpen,
    handleToggleSidebar,
    selectedMarkerData,
    handleCloseMarkerModal,
  };
};
