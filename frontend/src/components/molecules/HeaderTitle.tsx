import { styled } from '@mui/material';
import React from 'react';
import { Label } from '../atoms/Label';

// レイアウトに関するスタイルは HeaderTitle 内で定義
const StyledHeaderTitle = styled('div')`
  flex-grow: 1;
`;

interface HeaderTitleProps {
  text: string;
}

// 簡易なコンポーネントのため、テストは省略
export const HeaderTitle: React.FC<HeaderTitleProps> = ({ text }) => {
  return (
    <StyledHeaderTitle>
      <Label text={text} color="white" variant="h6" />
    </StyledHeaderTitle>
  );
};
