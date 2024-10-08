import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';
import '@photo-sphere-viewer/map-plugin/index.css';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { LayerData } from '../types/layer';
import { MarkerData } from '../types/marker';
import { SphereData } from '../types/sphere';

// 必要なユーティリティ関数をインポートまたは定義
import { animateToMarker } from '../utils/animationUtils';
import { sleep } from '../utils/sleepUtils';
import { getNearestSpheres, getSphereDataRelative } from '../utils/sphereUtils';

export class SphereViewerModel {
  viewerInstance: Viewer | null = null;
  mapPlugin: MapPlugin | null = null;
  markersPlugin: MarkersPlugin | null = null;

  initializeViewer(container: HTMLDivElement, isDesktop: boolean) {
    //
    this.viewerInstance = new Viewer({
      container: container,
      panorama: '',
      caption: '',
      loadingImg: '/images/load-37_256.gif',
      touchmoveTwoFingers: false,
      mousewheelCtrlKey: true,
      navbar: isDesktop ? 'zoom caption' : 'caption',
      plugins: [
        [MarkersPlugin, {}],
        [
          MapPlugin,
          {
            position: 'bottom left',
            rotation: '0deg',
            shape: 'square',
            size: isDesktop ? '300px' : '150px',
            static: true,
          },
        ],
      ],
    });

    this.mapPlugin = this.viewerInstance.getPlugin<MapPlugin>(MapPlugin);
    this.markersPlugin =
      this.viewerInstance.getPlugin<MarkersPlugin>(MarkersPlugin);

    // デスクトップでない場合は、マップを非表示にする
    if (!isDesktop) {
      this.mapPlugin?.close();
    }
  }

  updateMarkersAndMap(
    selectedSphere: SphereData,
    sphereDataList: SphereData[],
    markerDataList: MarkerData[],
    markerTooltipContents: { [key: string]: string }
  ) {
    if (!this.viewerInstance || !this.markersPlugin || !this.mapPlugin) return;

    // マーカーのクリア
    this.markersPlugin.clearMarkers();

    // 近隣のSphereを取得
    const filteredSpheres = getNearestSpheres(sphereDataList, selectedSphere);

    // Sphereのマーカーを追加
    filteredSpheres.forEach((sphere) => {
      const size = sphere.distance < 500 ? 40 : 20;
      const yaw = (sphere.orientation.yaw / 180) * Math.PI;
      const pitch = (sphere.orientation.pitch / 180) * Math.PI;
      this.markersPlugin?.addMarker({
        id: sphere.sphereData.id,
        position: { yaw, pitch },
        image: '/images/marker-pano.png',
        size: { width: size, height: size },
        anchor: 'bottom center',
        tooltip: sphere.sphereData.name,
      });
    });

    // Sphereに属するマーカーを追加
    const filteredMarkers = markerDataList.filter(
      (marker) => selectedSphere.id === marker.sphereId
    );
    filteredMarkers.forEach((marker) => {
      this.markersPlugin?.addMarker({
        id: marker.id,
        position: {
          yaw: (marker.orientation.yaw * Math.PI) / 180,
          pitch: (marker.orientation.pitch * Math.PI) / 180,
        },
        image: '/images/icons8-pic-50.png',
        size: { width: 40, height: 40 },
        anchor: 'bottom center',
        tooltip: {
          content: markerTooltipContents[marker.id],
          className: 'custom-tooltip',
          position: 'top',
          trigger: 'hover',
        },
      });
    });

    // マップの中心を更新
    this.mapPlugin?.setCenter({
      x: selectedSphere.position.x,
      y: selectedSphere.position.y,
    });
  }

  handleLayerChange(selectedLayer: LayerData, sphereDataList: SphereData[]) {
    if (!this.viewerInstance || !this.mapPlugin) return;

    this.mapPlugin.setImage(selectedLayer.imageUrl);
    this.mapPlugin.setHotspots(
      sphereDataList
        .filter((sphere) => sphere.layerId === selectedLayer.id)
        .map((sphere) => ({
          id: sphere.id,
          x: sphere.position.x,
          y: sphere.position.y,
          image: '/images/marker-pano.png',
          size: 20,
        }))
    );
  }

  async handleSphereChange(
    selectedSphere: SphereData,
    lastSelectedSphere: SphereData | null,
    layerChanged: boolean
  ) {
    if (!this.viewerInstance) return;

    if (!layerChanged && lastSelectedSphere) {
      // レイヤーが同じ場合、アニメーションで移動
      const spheraDataRelative = getSphereDataRelative(
        selectedSphere,
        lastSelectedSphere
      );
      animateToMarker(
        this.viewerInstance,
        spheraDataRelative.orientation.yaw,
        spheraDataRelative.orientation.pitch
      );
      await sleep(1000);
    }
    this.viewerInstance
      .setPanorama(selectedSphere.imageUrl, { caption: selectedSphere.name })
      .catch((error) => console.error('Error loading sphere:', error));
  }

  handleMarkerChange(selectedMarker: MarkerData) {
    if (!this.viewerInstance) return;

    // マーカーの位置にアニメーションで移動
    animateToMarker(
      this.viewerInstance,
      selectedMarker.orientation.yaw,
      selectedMarker.orientation.pitch
    );
  }
}
