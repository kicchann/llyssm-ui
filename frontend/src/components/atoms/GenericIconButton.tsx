import {
  Close,
  GridView,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Layers,
  MoreVert,
} from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';

interface GenericIconButtonProps {
  title: string;
  onClick?: () => void;
  iconType?:
    | 'closeSidebar'
    | 'openSidebar'
    | 'openDrawer'
    | 'closeDrawer'
    | 'layerTileGrid'
    | 'settingMenu'
    | 'close';
  dataTestId?: string;
}

const icons = {
  closeSidebar: <KeyboardDoubleArrowLeft />,
  openSidebar: <KeyboardDoubleArrowRight />,
  openDrawer: <Layers />,
  closeDrawer: <Layers />,
  layerTileGrid: <GridView />,
  settingMenu: <MoreVert />,
  close: <Close />,
};

const StyledIconButton = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.5);
`;

export const GenericIconButton: React.FC<GenericIconButtonProps> = ({
  title,
  onClick,
  iconType = 'close',
  dataTestId = 'generic-icon-button',
}) => {
  console.log(dataTestId);
  return (
    <StyledIconButton
      title={title}
      onClick={onClick ? onClick : () => {}}
      data-testid={dataTestId}
      aria-label={title}
    >
      {icons[iconType]}
    </StyledIconButton>
  );
};
