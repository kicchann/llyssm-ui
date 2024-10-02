import { styled } from '@mui/material';

const SidebarWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SidebarContainer = styled('div')<{ isOpen: boolean }>`
  overflow-y: auto;
  background-color: #fff;
  transition:
    width 0.3s ease,
    padding 0.3s ease;
  box-shadow: ${({ isOpen }) =>
    isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none'};
  width: ${({ isOpen }) => (isOpen ? 'var(--sidebar-width, 300px)' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '10px' : '0')};
`;

interface SidebarProps {
  isOpen: boolean;
  content: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, content }) => {
  return (
    <SidebarWrapper>
      <SidebarContainer isOpen={isOpen} aria-hidden={!isOpen} role="region">
        {content}
      </SidebarContainer>
    </SidebarWrapper>
  );
};
