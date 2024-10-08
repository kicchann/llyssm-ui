import { Box, styled } from '@mui/material';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface CenterBoxWithTransformProps {
  children: React.ReactNode;
  wrapperProps?: object; // 必要に応じて外部からズームやパンの設定を上書きできるように
}

const StyledCenterBox = styled(Box)`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8;
`;

const defaultWrapperProps = {
  disabled: false,
  initialScale: 1,
  doubleClick: { mode: 'reset' as 'reset' },
  panning: { disabled: false, activationKeys: [], excluded: [] },
  pinch: { excluded: [], step: 5 },
  wheel: { activationKeys: [], excluded: [], smoothStep: 0.001, step: 0.2 },
};

export const CenterBoxWithTransform: React.FC<CenterBoxWithTransformProps> = ({
  children,
  wrapperProps = defaultWrapperProps, // デフォルトのwrapperPropsを用意
}) => {
  return (
    <StyledCenterBox>
      <TransformWrapper {...wrapperProps}>
        <TransformComponent>{children}</TransformComponent>
      </TransformWrapper>
    </StyledCenterBox>
  );
};
