import { Box, Drawer, styled } from '@mui/material';
import React, { useState } from 'react';
import { CloseButton } from './CloseButton';
import { ToggleDrawerButton } from './ToggleDrawerButton';

const DrawerBox = styled(Box)`
  width: 300px;
  padding: 16px;
  padding-top: 48px; /* 閉じるボタン分のスペースを確保 */
  position: relative;
`;

interface DrawerNodeProps {
  children: React.ReactNode;
}

export const DrawerNode: React.FC<DrawerNodeProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  return (
    <div data-testid="drawer-node">
      {/* メニューを開くボタン */}
      <ToggleDrawerButton isOpen={isOpen} onToggle={toggleDrawer(true)} />

      {/* 右からスライドするメニュー */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <DrawerBox role="presentation">
          {/* 閉じるボタン */}
          <CloseButton onClick={toggleDrawer(false)} />
          {children}
        </DrawerBox>
      </Drawer>
    </div>
  );
};
