// photo-sphere-viewer
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';
import '@photo-sphere-viewer/map-plugin/index.css';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css';
// react
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// global state
import {
  selectHoveredMarkerId,
  selectLastSphereId,
  selectLayerId,
  selectMarkerId,
  selectSphereId,
} from '../store/slices/viewerSlice';
import { RootState } from '../store/store';
import { SphereData } from '../types/map';
// utils
import { animateToMarker } from '../utils/animationUtils';
import { getNearestSpheres, getSphereDataRelative } from '../utils/sphereUtils';

export const PanoramaViewerViewModel = () => {
  const dispatch = useDispatch();
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const viewerInstanceRef = useRef<Viewer | null>(null);
  const mapPluginRef = useRef<MapPlugin | null>(null);
  const markersPluginRef = useRef<MarkersPlugin | null>(null);

  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const markerDataList = useSelector(
    (state: RootState) => state.viewer.markerDataList
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

  // Viewerの初期化
  const initializeViewer = () => {
    if (!viewerRef.current) return;
    const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

    // インスタンスの生成
    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: '',
      caption: '',
      loadingImg: baseUrl + 'loader.gif',
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      navbar: 'zoom caption',
      plugins: [
        [MarkersPlugin, {}],
        [
          MapPlugin,
          {
            position: 'bottom left',
            rotation: '0deg',
            shape: 'square',
            size: '300px',
            static: true,
          },
        ],
      ],
    });

    // Viewerのイベントリスナー
    viewerInstanceRef.current = viewer;
    mapPluginRef.current = viewer.getPlugin<MapPlugin>(MapPlugin);
    markersPluginRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);

    // ホットスポットクリック時の処理
    mapPluginRef.current?.addEventListener(
      'select-hotspot',
      ({ hotspotId }) => {
        dispatch(selectSphereId(hotspotId));
      }
    );

    // マーカークリック時の処理
    markersPluginRef.current?.addEventListener(
      'select-marker',
      ({ marker }) => {
        const selectedSphere = sphereDataList.find(
          (sphere) => sphere.id === marker.id
        );
        if (selectedSphere) {
          dispatch(selectSphereId(marker.id));
          dispatch(selectMarkerId(null));
        }
        const selectedMarker = markerDataList.find(
          (_marker) => _marker.id === marker.id
        );
        if (selectedMarker) dispatch(selectMarkerId(marker.id));
      }
    );

    // マーカーにホバー時の処理
    markersPluginRef.current?.addEventListener('enter-marker', ({ marker }) => {
      const hoveredMarker = markerDataList.find(
        (_marker) => _marker.id === marker.id
      );
      dispatch(selectHoveredMarkerId(marker.id));
    });

    markersPluginRef.current?.addEventListener('leave-marker', () => {
      dispatch(selectHoveredMarkerId(null));
    });
  };

  // markerと地図の更新
  const updateMarkersAndMap = (selectedSphere: SphereData) => {
    if (!viewerInstanceRef.current) return;

    const markersPlugin =
      viewerInstanceRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);

    // markerの初期化
    markersPlugin.clearMarkers();
    // 選択したSphereの周囲にあるSphereを取得
    const filteredSpheres = getNearestSpheres(sphereDataList, selectedSphere);
    // Sphereのmarkerを追加
    filteredSpheres.forEach((sphere) => {
      const size = sphere.distance < 500 ? 40 : 20;
      const yaw = (sphere.orientation.yaw / 180) * Math.PI;
      const pitch = (sphere.orientation.pitch / 180) * Math.PI;
      markersPlugin.addMarker({
        id: sphere.sphereData.id,
        position: { yaw, pitch },
        image: '/images/icons8-360-60.png',
        size: { width: size, height: size },
        anchor: 'bottom center',
        tooltip: sphere.sphereData.name,
      });
    });
    // 選択したSphereのmarkerを追加
    const filteredMarkers = markerDataList.filter(
      (marker) => selectedSphere.id === marker.sphereId
    );
    filteredMarkers.forEach((marker) => {
      markersPlugin.addMarker({
        id: marker.id,
        position: {
          yaw: (marker.orientation.yaw * Math.PI) / 180,
          pitch: (marker.orientation.pitch * Math.PI) / 180,
        },
        image: '/images/icons8-pic-50.png',
        size: { width: 40, height: 40 },
        anchor: 'bottom center',
        tooltip: marker.name,
      });
    });
    // 地図の中心を選択したSphereに設定
    mapPluginRef.current?.setCenter({
      x: selectedSphere.position.x,
      y: selectedSphere.position.y,
    });
  };

  const handleLayerChange = (layerId: string | null) => {
    if (!layerId || !viewerInstanceRef.current) return;

    const selectedLayer = layerDataList.find((layer) => layer.id === layerId);
    if (!selectedLayer) return;

    const mapPlugin = viewerInstanceRef.current.getPlugin<MapPlugin>(MapPlugin);
    mapPlugin.setImage(selectedLayer.imageUrl);
    mapPlugin.setHotspots(
      sphereDataList
        .filter((sphere) => sphere.layerId === layerId)
        .map((sphere) => ({
          id: sphere.id,
          x: sphere.position.x,
          y: sphere.position.y,
          image:
            'https://photo-sphere-viewer-data.netlify.app/assets/pictos/pin-red.png',
        }))
    );
  };

  // Sphereの変更時の処理
  const handleSphereChange = (sphereId: string | null) => {
    if (!sphereId || !viewerInstanceRef.current) return;

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === sphereId
    );
    if (!selectedSphere) return;

    const selectedLayer = layerDataList.find(
      (layer) => layer.id === selectedSphere.layerId
    );
    if (!selectedLayer) return;

    // Layerの変更
    if (selectedLayerId !== selectedLayer.id) {
      dispatch(selectLayerId(selectedLayer.id));
    } else {
      if (lastSelectedSphereId) {
        const spheraDataRerative = getSphereDataRelative(
          selectedSphere,
          sphereDataList.find((sphere) => sphere.id === lastSelectedSphereId)!
        );
        animateToMarker(
          viewerInstanceRef.current,
          spheraDataRerative.orientation.yaw,
          spheraDataRerative.orientation.pitch
        );
      }
    }
    dispatch(selectLastSphereId(selectedSphere.id));
    // Sphereの変更
    viewerInstanceRef.current
      .setPanorama(selectedSphere.imageUrl, { caption: selectedSphere.name })
      .catch((error) => console.error('Error loading panorama:', error));

    // Markerと地図の更新
    updateMarkersAndMap(selectedSphere);
  };

  // Markerの変更時の処理
  const handleMarkerChange = (markerId: string | null) => {
    if (!markerId || !viewerInstanceRef.current) return;

    const selectedMarker = markerDataList.find(
      (marker) => marker.id === markerId
    );
    if (!selectedMarker) return;

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === selectedMarker.sphereId
    );
    if (!selectedSphere) return;

    const selectedLayer = layerDataList.find(
      (layer) => layer.id === selectedSphere.layerId
    );
    if (!selectedLayer) return;

    // Layerの変更
    if (selectedLayerId !== selectedLayer.id) {
      dispatch(selectLayerId(selectedLayer.id));
    }

    // Sphereの変更
    if (selectedSphereId !== selectedSphere.id) {
      dispatch(selectSphereId(selectedSphere.id));
    }

    // Marker位置への移動
    animateToMarker(
      viewerInstanceRef.current,
      selectedMarker.orientation.yaw,
      selectedMarker.orientation.pitch
    );
  };

  return {
    viewerRef,
    viewerInstanceRef,
    initializeViewer,
    handleLayerChange,
    handleSphereChange,
    handleMarkerChange,
  };
};
