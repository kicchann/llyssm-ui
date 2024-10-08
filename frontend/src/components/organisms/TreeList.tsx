import { Box, Stack, styled, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React from 'react';
import { useTreeListViewModel } from '../../viewModels/TreeListViewModel';
import { CustomTreeItem } from '../molecules/CustomTreeItem';

const StyledSimpleTreeView = styled(SimpleTreeView)`
  & .Mui-selected {
    background-color: transparent;
  }
`;

const StyledBox = styled(Box)`
  min-height: 352px;
  min-width: 300px;
`;

export const TreeList: React.FC = () => {
  const {
    layerDataList,
    sphereDataList,
    markerDataList,
    selectedLayerId,
    selectedSphereId,
    selectedMarkerId,
    handleItemClick,
  } = useTreeListViewModel();

  // layerDataがない場合にnullを返す
  if (layerDataList.length === 0) {
    return <Typography>No layer data available</Typography>;
  }

  return (
    <Stack spacing={2}>
      <StyledBox>
        <StyledSimpleTreeView onItemClick={handleItemClick}>
          {layerDataList.map((layer) => (
            <CustomTreeItem
              key={layer.id}
              id={layer.id}
              label={layer.name}
              isSelected={selectedLayerId === layer.id}
              onItemClick={handleItemClick}
            >
              {sphereDataList
                .filter((sphere) => sphere.layerId === layer.id)
                .map((sphere) => (
                  <CustomTreeItem
                    key={sphere.id}
                    id={sphere.id}
                    label={sphere.name}
                    isSelected={selectedSphereId === sphere.id}
                    onItemClick={handleItemClick}
                  >
                    {markerDataList
                      .filter((marker) => marker.sphereId === sphere.id)
                      .map((marker) => (
                        <CustomTreeItem
                          key={marker.id}
                          id={marker.id}
                          label={marker.name}
                          isSelected={selectedMarkerId === marker.id}
                          onItemClick={handleItemClick}
                        />
                      ))}
                  </CustomTreeItem>
                ))}
            </CustomTreeItem>
          ))}
        </StyledSimpleTreeView>
      </StyledBox>
    </Stack>
  );
};
