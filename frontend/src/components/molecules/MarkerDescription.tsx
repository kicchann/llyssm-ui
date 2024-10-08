import { styled } from '@mui/material';
import React from 'react';
import { Label } from '../atoms/Label';

interface MarkerDescriptionProps {
  title: string;
  description: string;
}

const StyledH2Typography = styled('div')`
  margin-bottom: 2;
`;

const StyledTypography = styled('div')`
  margin-bottom: 2;
`;

export const MarkerDescription: React.FC<MarkerDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <StyledH2Typography data-testid="marker-modal-title">
        <Label text={title} color="white" variant="h2" />
      </StyledH2Typography>
      <StyledTypography data-testid="marker-modal-description">
        <Label text={description} color="white" />
      </StyledTypography>
    </>
  );
};
