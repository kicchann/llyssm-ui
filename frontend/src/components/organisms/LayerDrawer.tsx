import { Layers } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import { TreeList } from './TreeList'; // TreeListのインポート

const DrawerBox = styled(Box)({
  width: 300,
  padding: 16,
  paddingTop: 48, // 閉じるボタン分のスペースを確保
  position: 'relative',
});

const CloseButtonBox = styled(Box)({
  position: 'absolute',
  top: 8, // ボタンを右上に固定
  right: 8,
});

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
        <DrawerBox role="presentation">
          {/* 閉じるボタン */}
          <CloseButtonBox>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </CloseButtonBox>
          {/* TreeListを表示 */}
          <TreeList />
        </DrawerBox>
      </Drawer>
    </>
  );
};
