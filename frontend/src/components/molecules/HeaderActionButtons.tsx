import { Box, styled } from '@mui/material';
import React from 'react';

interface HeaderActionButtonsProps {
  children: React.ReactNode;
}

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 8px; // ボタン間のスペースを統一
  justify-content: flex-end; // ボタンを右寄せ
`;

// 簡易なコンポーネントのため、テストは省略
export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  children,
}) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};
