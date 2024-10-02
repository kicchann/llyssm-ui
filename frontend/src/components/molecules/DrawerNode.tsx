import { Layers } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton, styled } from '@mui/material';
import React, { useState } from 'react';

const DrawerBox = styled(Box)`
  width: 300px;
  padding: 16px;
  padding-top: 48px; /* 閉じるボタン分のスペースを確保 */
  position: relative;
`;

const CloseButtonBox = styled(Box)`
  position: absolute;
  top: 8; /* ボタンを右上に固定 */
  right: 8;
`;

interface DrawerNodeProps {
  content: React.ReactNode;
}

export const DrawerNode: React.FC<DrawerNodeProps> = ({ content }) => {
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
          {content}
        </DrawerBox>
      </Drawer>
    </>
  );
};
