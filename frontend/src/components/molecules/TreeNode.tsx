import { TreeItem } from '@mui/x-tree-view/TreeItem';
import React from 'react';

interface TreeNodeProps {
  id: string;
  label: string;
  children?: React.ReactNode;
  onItemClick: (event: React.SyntheticEvent, itemId: string) => void;
  isSelected?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  id,
  label,
  children,
  onItemClick,
  isSelected,
}) => {
  return (
    <TreeItem
      key={id}
      itemId={id}
      label={label}
      onClick={(event) => onItemClick(event, id)}
      sx={
        {
          backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          color: 'black',
        }
      }
    >
      {children}
    </TreeItem>
  );
};
