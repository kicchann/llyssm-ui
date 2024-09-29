import { Box } from '@mui/material';
import { styled } from '@mui/system';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/map-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import React from 'react';
import { useSphereViewerViewModel } from '../../viewModels/SphereViewerViewModel';

interface SphereViewerProps {
  isDesktop: boolean;
  optionalContent?: React.ReactNode;
}
const StyledWholeBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
});

const ViewerBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const SphereViewer: React.FC<SphereViewerProps> = ({
  isDesktop,
  optionalContent,
}) => {
  const { viewerRef } = useSphereViewerViewModel(isDesktop);

  const content = <ViewerBox ref={viewerRef}></ViewerBox>;

  return (
    <StyledWholeBox>
      {content}
      {optionalContent}
    </StyledWholeBox>
  );
};
