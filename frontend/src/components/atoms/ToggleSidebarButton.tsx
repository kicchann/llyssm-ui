import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/viewerSlice';
import { RootState } from '../../store/store';

export const ToggleSidebarButton: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.viewer.isSidebarOpen
  );

  return (
    <IconButton
      onClick={() => dispatch(toggleSidebar())}
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {isSidebarOpen ? (
        <KeyboardDoubleArrowLeft />
      ) : (
        <KeyboardDoubleArrowRight />
      )}
    </IconButton>
  );
};
