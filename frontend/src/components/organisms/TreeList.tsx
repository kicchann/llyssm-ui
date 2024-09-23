import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React from 'react';
import { useSidebarTreeViewModel } from '../../viewModels/SidebarTreeViewModel';
import { useTreeListViewModel } from '../../viewModels/TreeListViewModel';
import { TreeNode } from '../molecules/TreeNode';

const StyledSimpleTreeView = styled(SimpleTreeView)({
  '& .Mui-selected': {
    backgroundColor: 'transparent',
  },
  bgcolor: 'transparent',
});

export const TreeList: React.FC = () => {
  const { handleItemClick } = useSidebarTreeViewModel();
  const {
    layerDataList,
    sphereDataList,
    markerDataList,
    selectedLayerId,
    selectedSphereId,
    selectedMarkerId,
  } = useTreeListViewModel();

  // layerDataがない場合にnullを返す
  if (layerDataList.length === 0) {
    return <Typography>No layer data available</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ minHeight: 352, minWidth: 300 }}>
        <StyledSimpleTreeView onItemClick={handleItemClick}>
          {layerDataList.map((layer) => (
            <TreeNode
              key={layer.id}
              id={layer.id}
              label={layer.name}
              isSelected={selectedLayerId === layer.id}
              onItemClick={handleItemClick}
            >
              {sphereDataList
                .filter((sphere) => sphere.layerId === layer.id)
                .map((sphere) => (
                  <TreeNode
                    key={sphere.id}
                    id={sphere.id}
                    label={sphere.name}
                    isSelected={selectedSphereId === sphere.id}
                    onItemClick={handleItemClick}
                  >
                    {markerDataList
                      .filter((marker) => marker.sphereId === sphere.id)
                      .map((marker) => (
                        <TreeNode
                          key={marker.id}
                          id={marker.id}
                          label={marker.name}
                          isSelected={selectedMarkerId === marker.id}
                          onItemClick={handleItemClick}
                        />
                      ))}
                  </TreeNode>
                ))}
            </TreeNode>
          ))}
        </StyledSimpleTreeView>
      </Box>
    </Stack>
  );
};
