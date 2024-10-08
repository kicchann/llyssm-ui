import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { DrawerNode } from '../molecules/DrawerNode';
import { HeaderActionButtons } from '../molecules/HeaderActionButtons';
import { HeaderTitle } from '../molecules/HeaderTitle';
import { NavigateSettingMenuButton } from '../molecules/NavigateSettingMenuButton';
import { TreeList } from './TreeList';

interface HeaderBaseProps {
  isDesktop: boolean;
}

const HeaderBase: React.FC<HeaderBaseProps> = ({ isDesktop }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <HeaderTitle text="View Page" />
        <HeaderActionButtons>
          {!isDesktop && <DrawerNode children={<TreeList />} />}
          <NavigateSettingMenuButton />
        </HeaderActionButtons>
      </Toolbar>
    </AppBar>
  );
};

export const Header: React.FC = () => <HeaderBase isDesktop={true} />;
export const CompactHeader: React.FC = () => <HeaderBase isDesktop={false} />;
