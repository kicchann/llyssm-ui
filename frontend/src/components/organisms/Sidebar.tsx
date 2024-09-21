import React from 'react';
import styled from 'styled-components';
import { TreeList } from './TreeList';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SidebarContainer = styled.div`
  overflow-y: auto;
  background-color: #fff;
  transition:
    width 0.3s ease,
    padding 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  &.open {
    width: var(--sidebar-width, 300px);
    padding: 10px;
  }

  &.closed {
    width: 0;
    padding: 0;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    &.open {
      width: 100%;
    }
  }
`;

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <SidebarWrapper>
      <SidebarContainer
        className={isOpen ? 'open' : 'closed'}
        aria-hidden={!isOpen}
        role="region"
      >
        <TreeList />
      </SidebarContainer>
    </SidebarWrapper>
  );
};
