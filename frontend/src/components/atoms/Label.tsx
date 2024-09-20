// src/components/atoms/Label.tsx
import { Typography } from '@mui/material';
import React from 'react';

interface LabelProps {
  text: string;
  color?: string;
}

export const Label: React.FC<LabelProps> = ({ text, color = 'black' }) => (
  <Typography style={{ color }}>{text}</Typography>
);
