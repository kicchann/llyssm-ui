import { TreeItem } from '@mui/x-tree-view/TreeItem';
import React from 'react';
import styled from 'styled-components';
import { Label } from '../atoms/Label';
import { UserIcon } from '../atoms/UserIcon';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

interface TreeNodeProps {
  id: string;
  label: string;
  children?: React.ReactNode;
  onItemClick: (event: React.SyntheticEvent, itemId: string) => void;
  isSelected?: boolean;
  level: number;
  icon?: React.ReactNode | null;
}

const props = {
  size: 20,
};

export const TreeNode: React.FC<TreeNodeProps> = ({
  id,
  label,
  icon = <UserIcon {...props} />,
  children,
  onItemClick,
  isSelected,
}) => {
  const LabelComponent = isSelected ? (
    <StyledHeader>
      <Label text={label} color="blue" />
      <span style={{ marginRight: 8 }}>{icon}</span>
    </StyledHeader>
  ) : (
    <StyledHeader>
      <Label text={label} />
      <span style={{ marginRight: 8 }}>{icon}</span>
    </StyledHeader>
  );

  return (
    <TreeItem
      key={id}
      itemId={id}
      label={LabelComponent}
      onClick={(event) => onItemClick(event, id)}
      sx={{
        bgcolor: isSelected ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
      }}
    >
      <div style={{ alignItems: 'center' }}>
        {/* <span>test</span> */}
        {children}
      </div>
    </TreeItem>
  );
};
