// react
import { useEffect, useMemo, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useDispatch, useSelector } from 'react-redux';
// global state
import { setActiveModal } from '../store/slices/statusSlice';
import {
  selectLastSphereId,
  selectLayerId,
  selectMarkerId,
  selectSphereId,
} from '../store/slices/viewSlice';
import { RootState } from '../store/store';
// model
import { SphereViewerModel } from '../models/SphereViewerModel';
// utils
import { CustomTooltip } from '../components/molecules/CustomTooltip';

export const useSphereViewerViewModel = (isDesktop: boolean) => {
  const dispatch = useDispatch();
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const sphereViewerModelRef = useRef<SphereViewerModel | null>(null);

  // 現在のyawとpitchを保持
  // const [currentOrientation, setCurrentOrientation] = useState<Orientation>({
  //   yaw: 0.0,
  //   pitch: 0.0,
  // });
  // updateOrientationはuseCallbackでラップし、無駄な再生成を避ける
  // const updateOrientation = useCallback(() => {
  //   if (sphereViewerModelRef.current) {
  //     const orientation = getOrientation(
  //       sphereViewerModelRef.current.viewerInstance
  //     );
  //     setCurrentOrientation((prev) => {
  //       // 違いが大きい時だけ更新して、無駄な再レンダリングを防ぐ
  //       if (
  //         Math.abs(orientation.yaw - prev.yaw) > 0.1 ||
  //         Math.abs(orientation.pitch - prev.pitch) > 0.1
  //       ) {
  //         return orientation;
  //       }
  //       return prev;
  //     });
  //   }
  // }, [sphereViewerModelRef]);
  // デスクトップ時のみアニメーションを有効化
  // useAnimationFrame(isDesktop, updateOrientation);

  const {
    selectedLayerId,
    lastSelectedSphereId,
    selectedSphereId,
    selectedMarkerId,
    layerDataList,
    sphereDataList,
    markerDataList,
  } = useSelector((state: RootState) => state.viewer);

  // ツールチップの内容をView側で作成
  const markerTooltipContents = useMemo(() => {
    return markerDataList.reduce(
      (contents, marker) => {
        const tooltipContent = ReactDOMServer.renderToStaticMarkup(
          <CustomTooltip markerData={marker} key={marker.id} />
        );
        contents[marker.id] = tooltipContent;
        return contents;
      },
      {} as { [key: string]: string }
    );
  }, [markerDataList]);

  // Viewerの初期化
  useEffect(() => {
    if (!viewerRef.current) return;

    sphereViewerModelRef.current = new SphereViewerModel();
    sphereViewerModelRef.current.initializeViewer(viewerRef.current, isDesktop);

    // ビューアのイベントリスナーを設定
    const viewerInstance = sphereViewerModelRef.current.viewerInstance;
    const mapPlugin = sphereViewerModelRef.current.mapPlugin;
    const markersPlugin = sphereViewerModelRef.current.markersPlugin;

    // Sphere上にあるマーカークリック時の処理
    markersPlugin?.addEventListener('select-marker', ({ marker }) => {
      // Sphere上にあるマーカーがSphereかどうか判定
      const selectedSphere = sphereDataList.find(
        (sphere) => sphere.id === marker.id
      );
      if (selectedSphere) {
        dispatch(selectSphereId(marker.id));
        dispatch(selectMarkerId(null));
        return;
      }
      // Sphere上にあるマーカーがMarkerかどうか判定
      const selectedMarker = markerDataList.find(
        (_marker) => _marker.id === marker.id
      );
      if (selectedMarker) {
        dispatch(selectMarkerId(marker.id));
        dispatch(setActiveModal('marker' as 'marker'));
      }
    });

    // ホットスポットクリック時の処理
    mapPlugin?.addEventListener('select-hotspot', ({ hotspotId }) => {
      dispatch(selectSphereId(hotspotId));
    });

    return () => {
      viewerInstance?.destroy();
      sphereViewerModelRef.current = null;
    };
  }, [markerDataList, sphereDataList, layerDataList, isDesktop]);

  // Layerの変更時
  // やること: handleLayerChangeを呼び出す
  // 監視対象: selectedLayerId, layerDataList
  useEffect(() => {
    // console.log('selectedLayerId', selectedLayerId);
    if (!selectedLayerId || !sphereViewerModelRef.current) return;

    const selectedLayer = layerDataList.find(
      (layer) => layer.id === selectedLayerId
    );
    if (!selectedLayer) return;

    sphereViewerModelRef.current.handleLayerChange(
      selectedLayer,
      sphereDataList
    );
  }, [selectedLayerId]); //, layerDataList, sphereDataList

  // Sphereの変更時
  // やること: handleSphereChangeを呼び出す、マーカーとマップの更新、lastSelectedSphereIdを更新
  // 監視対象: selectedSphereId, sphereDataList, markerDataList, layerDataList
  useEffect(() => {
    // console.log('selectedSphereId', selectedSphereId);
    if (!selectedSphereId || !sphereViewerModelRef.current) return;

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === selectedSphereId
    );
    if (!selectedSphere) return;

    const lastSelectedSphere = sphereDataList.find(
      (sphere) => sphere.id === lastSelectedSphereId
    );

    const layerChanged = selectedSphere.layerId !== lastSelectedSphere?.layerId;

    if (layerChanged && selectedSphere.layerId) {
      dispatch(selectLayerId(selectedSphere.layerId));
    }
    sphereViewerModelRef.current.handleSphereChange(
      selectedSphere,
      lastSelectedSphere || null,
      layerChanged
    );

    dispatch(selectLastSphereId(selectedSphere.id));

    // マーカーとマップの更新
    sphereViewerModelRef.current.updateMarkersAndMap(
      selectedSphere,
      sphereDataList,
      markerDataList,
      markerTooltipContents
    );
  }, [selectedSphereId]); //, markerDataList, sphereDataList, layerDataList

  // Markerの変更時
  // やること: handleMarkerChangeを呼び出す
  // 監視対象: selectedMarkerId, markerDataList
  useEffect(() => {
    // console.log('selectedMarkerId', selectedMarkerId);
    if (!selectedMarkerId || !sphereViewerModelRef.current) return;

    const selectedMarker = markerDataList.find(
      (marker) => marker.id === selectedMarkerId
    );
    if (!selectedMarker) return;

    sphereViewerModelRef.current.handleMarkerChange(selectedMarker);
  }, [selectedMarkerId]); //, markerDataList

  return {
    viewerRef,
  };
};
