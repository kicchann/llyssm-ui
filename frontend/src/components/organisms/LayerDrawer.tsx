import { Layers } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { TreeList } from './TreeList'; // TreeListのインポート

export const LayerDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  return (
    <>
      {/* メニューを開くボタン */}
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <Layers />
      </IconButton>

      {/* 右からスライドするメニュー */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, padding: 2 }} role="presentation">
          {/* 閉じるボタン */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>

          {/* TreeListを表示 */}
          <TreeList />
        </Box>
      </Drawer>
    </>
  );
};
