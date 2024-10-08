import React from 'react';
import { useLayerViewerViewModel } from '../../viewModels/LayerViewerViewModel';
import { CustomImage } from '../atoms/CustomImage';
import { CenterBoxWithTransform } from '../molecules/CenterBoxWithTransform';
import { SpherePin } from '../molecules/SpherePin';
export const LayerViewer: React.FC = () => {
  const { selectedLayer, sphereDataList, handleSphereClick } =
    useLayerViewerViewModel();

  if (!selectedLayer) {
    return <div>No layer selected</div>;
  }

  return (
    <CenterBoxWithTransform>
      <CustomImage
        src={selectedLayer.imageUrl}
        alt={selectedLayer.name}
        variant="layer"
      />
      {/* Sphereのピンを配置 */}
      {sphereDataList
        .filter((sphere) => sphere.layerId === selectedLayer.id)
        .map((sphere) => (
          <SpherePin
            key={sphere.id}
            top={`${(sphere.position.y / selectedLayer.imageSize.height) * 100}%`}
            left={`${(sphere.position.x / selectedLayer.imageSize.width) * 100}%`}
            onClick={() => handleSphereClick(sphere.id)}
            title={sphere.name}
          />
        ))}
    </CenterBoxWithTransform>
  );
};
