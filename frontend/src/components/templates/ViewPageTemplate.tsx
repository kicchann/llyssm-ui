// react
import React from 'react';
// material-ui
import { styled } from '@mui/material';
// components
// hooks
import { useFetchLayers } from '../../hooks/useFetchLayers';
import { useFetchMarkers } from '../../hooks/useFetchMarkers';
import { useFetchSpheres } from '../../hooks/useFetchSpheres';
// store
import { useViewPageTemplateViewModel } from '../../viewModels/ViewPageTemplateViewModel';
import { ModalNode } from '../molecules/ModalNode';
import { ShowLayerTileGridButton } from '../molecules/ShowLayerTileGridButton';
import { Sidebar } from '../molecules/Sidebar';
import { ToggleSidebarButton } from '../molecules/ToggleSidebarButton';
import { LayerTileGrid } from '../organisms/LayerTileGrid';
import { LayerViewer } from '../organisms/LayerViewer';
import { MarkerViewer } from '../organisms/MarkerViewer';
import { SphereViewer } from '../organisms/SphereViewer';
import { TreeList } from '../organisms/TreeList';
import { PageLayout } from './PageLayout';

const Content = styled('main')`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const OptionalContent = styled('div')`
  position: absolute;
  z-index: 1000;
  top: 10px;
  left: 10px;
`;

interface ViewPageTemplateProps {
  isDesktop: boolean;
  locationId: string;
}

export const ViewPageTemplate: React.FC<ViewPageTemplateProps> = ({
  isDesktop,
  locationId,
}) => {
  const {
    isSidebarOpen,
    activeModal,
    selectedSphereId,
    closeModal,
    handleToggleSidebar,
    clearSelection,
  } = useViewPageTemplateViewModel();

  // カスタムフックの使用
  useFetchLayers(); // 修正箇所
  useFetchSpheres(); // 修正箇所
  useFetchMarkers(); // 修正箇所
  console.log('selectedSphereId:', selectedSphereId);
  const optionalContent = isDesktop ? (
    <OptionalContent>
      <ToggleSidebarButton
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />
      <ShowLayerTileGridButton onClick={clearSelection} />
    </OptionalContent>
  ) : (
    <OptionalContent>
      <ShowLayerTileGridButton onClick={clearSelection} />
    </OptionalContent>
  );
  const mainContent = selectedSphereId ? (
    <SphereViewer isDesktop={isDesktop} optionalContent={optionalContent} />
  ) : (
    <LayerTileGrid />
  );

  return (
    <>
      {/* ページ全体のレイアウト */}
      <PageLayout isDesktop={isDesktop}>
        {/* サイドバー */}
        {isDesktop && <Sidebar isOpen={isSidebarOpen} content={<TreeList />} />}
        {/* メインコンテンツ */}
        <Content>{mainContent}</Content>
      </PageLayout>
      {/* レイヤーモーダルを表示 */}
      <ModalNode
        open={activeModal === 'layer'}
        onClose={closeModal}
        content={<LayerViewer />}
      />
      {/* マーカーモーダルを表示 */}
      <ModalNode
        open={activeModal === 'marker'}
        onClose={closeModal}
        content={<MarkerViewer />}
      />
    </>
  );
};
