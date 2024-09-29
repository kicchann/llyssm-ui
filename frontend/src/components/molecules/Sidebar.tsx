// import styled from 'styled-components';
import { styled } from '@mui/system';

const SidebarWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
});

const SidebarContainer = styled('div')<{ isOpen: boolean }>(({ isOpen }) => ({
  overflowY: 'auto',
  backgroundColor: '#fff',
  transition: 'width 0.3s ease, padding 0.3s ease',
  boxShadow: isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none',
  width: isOpen ? 'var(--sidebar-width, 300px)' : '0',
  padding: isOpen ? '10px' : '0',
  '@media (max-width: 768px)': {
    width: isOpen ? '100%' : '0',
  },
}));

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
