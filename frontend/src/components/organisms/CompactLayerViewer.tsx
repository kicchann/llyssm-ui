// /workspaces/malaspherer-ui/frontend/src/components/organisms/LayerViewer.tsx
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { selectSphereId } from '../../store/slices/viewerSlice';
import { RootState } from '../../store/store';

export const CompactLayerViewer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );

  const selectedLayer = layerDataList.find(
    (layer) => layer.id === selectedLayerId
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageSize({ width: naturalWidth, height: naturalHeight });
    }
  }, [selectedLayer]);

  if (!selectedLayer) {
    return <div>No layer selected</div>;
  }

  // Sphereのピンをクリックしたときの処理
  const handleSphereClick = (sphereId: string) => {
    dispatch(selectSphereId(sphereId));
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <TransformWrapper>
        <TransformComponent>
          <img
            ref={imageRef}
            src={selectedLayer.imageUrl}
            alt={selectedLayer.name}
            style={{ width: '100%', height: '100%' }}
          />
          {/* Sphereのピンを配置 */}
          {sphereDataList
            .filter((sphere) => sphere.layerId === selectedLayerId)
            .map((sphere) => (
              <div
                key={sphere.id}
                style={{
                  position: 'absolute',
                  top: `${(sphere.position.y / imageSize.height) * 100}%`,
                  left: `${(sphere.position.x / imageSize.width) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                title={sphere.name}
                onClick={() => handleSphereClick(sphere.id)}
              >
                <img
                  src="/images/marker-pano.png"
                  alt="Sphere Pin"
                  style={{ width: '24px', height: '24px' }}
                />
              </div>
            ))}
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};
