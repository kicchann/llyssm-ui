import { styled } from '@mui/material';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import React from 'react';

interface CustomTreeItemProps {
  id: string;
  label: string;
  children?: React.ReactNode;
  onItemClick: (event: React.SyntheticEvent, itemId: string) => void;
  isSelected?: boolean;
}

const StyledTreeItem = styled(TreeItem)<{ isSelected?: boolean }>`
  & .MuiTreeItem-content {
    padding: 4px 0;
  }
  color: black;
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
`;

export const CustomTreeItem: React.FC<CustomTreeItemProps> = ({
  id,
  label,
  children,
  onItemClick,
  isSelected,
}) => {
  return (
    <StyledTreeItem
      isSelected={isSelected}
      key={id}
      itemId={id}
      label={label}
      onClick={(event) => onItemClick(event, id)}
    >
      {children}
    </StyledTreeItem>
  );
};
