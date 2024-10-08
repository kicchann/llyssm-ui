import { Box, styled } from '@mui/material';
import React from 'react';
import { KeepScale } from 'react-zoom-pan-pinch';

interface SpherePinProps {
  top: string;
  left: string;
  onClick: () => void;
  title: string;
}

const StyledSpherePinBox = styled(Box)<{
  top: string;
  left: string;
}>`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

export const SpherePin: React.FC<SpherePinProps> = ({
  top,
  left,
  onClick,
  title,
}) => {
  return (
    <StyledSpherePinBox top={top} left={left} onClick={onClick} title={title}>
      {/* KeepScaleコンポーネントで画像のアスペクト比を保持 */}
      <KeepScale>
        <Box
          component="img"
          src="/images/marker-pano.png"
          alt="Sphere Pin"
          sx={{ width: '24px', height: '24px' }}
        />
      </KeepScale>
    </StyledSpherePinBox>
  );
};
