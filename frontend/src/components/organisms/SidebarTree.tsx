import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useSidebarTreeViewModel } from '../../viewModels/SidebarTreeViewModel';
import { TreeNode } from '../molecules/TreeNode';

const StyledSimpleTreeView = styled(SimpleTreeView)({
  '& .Mui-selected': {
    backgroundColor: 'transparent',
  },
});

export const SidebarTree: React.FC = () => {
  const { handleItemClick } = useSidebarTreeViewModel();
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const markerDataList = useSelector(
    (state: RootState) => state.viewer.markerDataList
  );
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const selectedSphereId = useSelector(
    (state: RootState) => state.viewer.selectedSphereId
  );
  const selectedMarkerId = useSelector(
    (state: RootState) => state.viewer.selectedMarkerId
  );

  // layerDataがない場合にnullを返す
  if (layerDataList.length === 0) {
    return <Typography>No layer data available</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ minHeight: 352, minWidth: 600 }}>
        <StyledSimpleTreeView
          onItemClick={handleItemClick}
          sx={{ bgcolor: 'transparent' }}
        >
          {layerDataList.map((layer) => (
            <TreeNode
              key={layer.id}
              id={layer.id}
              label={layer.name}
              isSelected={selectedLayerId === layer.id}
              onItemClick={handleItemClick}
              level={0}
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
                    level={1}
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
                          level={2}
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
