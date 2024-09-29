import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { DrawerNode } from '../molecules/DrawerNode';
import { MoreMenu } from '../molecules/SettingMenu';
import { TreeList } from './TreeList';

interface HeaderBaseProps {
  isDesktop: boolean;
}

const HeaderBase: React.FC<HeaderBaseProps> = ({ isDesktop }) => {
  const StyledTypography = styled(Typography)({
    flexGrow: 1,
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">View Page</StyledTypography>
        {!isDesktop && <DrawerNode content={<TreeList />} />}
        <MoreMenu />
      </Toolbar>
    </AppBar>
  );
};

export const Header: React.FC = () => <HeaderBase isDesktop={true} />;
export const CompactHeader: React.FC = () => <HeaderBase isDesktop={false} />;
