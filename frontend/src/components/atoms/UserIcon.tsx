import { AccountCircle } from '@mui/icons-material';
import React from 'react';

interface UserIconProps {
  size?: number;
  color?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({
  size = 16, //24,
  color = 'inherit',
}) => <AccountCircle style={{ fontSize: size, color: color }} />;
