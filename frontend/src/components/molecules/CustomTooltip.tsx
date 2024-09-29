import React from 'react';
import styled from 'styled-components';
import { MarkerData } from '../../types/map';

// スタイルの定義
// CustomTooltipはあとで静的なHTMLとして描画するため、styled-componentsを使ってスタイルを定義
// MUIは使わない
const StyledWrapper = styled.div`
  max-width: none;
  padding: 0;
  box-shadow: 0 0 0 2px white;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 4px 4px 0 0;
  padding: 30;
`;

const StyledContent = styled.article`
  margin: 1rem;
  text-align: justify;
`;

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledText = styled.p`
  margin: 0;
`;

interface CustomTooltipProps {
  markerData: MarkerData;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ markerData }) => {
  return (
    <>
      {/* Tooltip内容 */}
      <StyledWrapper className="custom-tooltip">
        <StyledImage src={markerData.thumbnailUrl} alt={markerData.name} />
        <StyledContent>
          <StyledTitle>{markerData.name}</StyledTitle>
          <StyledText>{markerData.description}</StyledText>
        </StyledContent>
      </StyledWrapper>
    </>
  );
};
