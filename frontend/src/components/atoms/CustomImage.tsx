import { styled } from '@mui/material';
import React from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  variant?: 'marker' | 'layer';
}

const StyledCustomImage = styled('img')<CustomImageProps>`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  /* variantが 'layer' の場合の追加スタイル */
  ${({ variant }) =>
    variant === 'layer' &&
    `
    height: 100%;
    object-fit: contain;
    cursor: grab;
  `}
`;

export const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  variant = 'marker',
}) => {
  return <StyledCustomImage src={src} alt={alt} variant={variant} />;
};
