import { Typography } from '@mui/material';
import React from 'react';

interface LabelProps {
  text: string;
  color?: string;
  variant?: 'h2' | 'h6' | 'body1' | 'subtitle1'; // 必要なvariantを指定
}

export const Label: React.FC<LabelProps> = ({
  text,
  color = 'black',
  variant = 'body1',
}) => (
  <Typography style={{ color }} variant={variant}>
    {text}
  </Typography>
);
