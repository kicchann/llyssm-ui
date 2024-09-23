import { styled } from '@mui/styles';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import React from 'react';

interface TreeNodeProps {
  id: string;
  label: string;
  children?: React.ReactNode;
  onItemClick: (event: React.SyntheticEvent, itemId: string) => void;
  isSelected?: boolean;
}

const StyledTreeItem = styled(TreeItem)(({ color }) => ({
  color: color || 'black',
}));

export const TreeNode: React.FC<TreeNodeProps> = ({
  id,
  label,
  children,
  onItemClick,
  isSelected,
}) => {
  return (
    <StyledTreeItem
      key={id}
      itemId={id}
      label={label}
      onClick={(event) => onItemClick(event, id)}
      color={isSelected ? 'rgba(0, 0, 0, 0.1)' : 'transparent'}
    >
      {children}
    </StyledTreeItem>
  );
};
