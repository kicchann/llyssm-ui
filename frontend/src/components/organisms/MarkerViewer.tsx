import React from 'react';
import { useMarkerViewerViewModel } from '../../viewModels/MarkerViewerViewModel';
import { CustomImage } from '../atoms/CustomImage';
import { CenterBoxWithTransform } from '../molecules/CenterBoxWithTransform';
import { MarkerDescription } from '../molecules/MarkerDescription';

// 簡易なコンポーネントのため、テストは省略
export const MarkerViewer: React.FC = () => {
  const { markerData } = useMarkerViewerViewModel();

  if (!markerData) {
    return null;
  }

  return (
    <>
      <CenterBoxWithTransform>
        <CustomImage
          src={markerData.imageUrl}
          alt={markerData.name}
          variant="marker"
        />
      </CenterBoxWithTransform>
      <MarkerDescription
        title={markerData.name}
        description={markerData.description}
      />
    </>
  );
};
