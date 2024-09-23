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

      {/* モーダルで詳細を表示 */}
      {/* <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            {markerData.name}
          </Typography>
          <img
            src={markerData.thumbnailUrl}
            alt={markerData.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <Typography variant="body1" mt={2}>
            {markerData.description}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ marginTop: '20px' }}
          >
            閉じる
          </Button>
        </Box>
      </Modal> */}
    </>
  );
};
