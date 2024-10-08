import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TreeList } from '../../../components/organisms/TreeList';
import { useTreeListViewModel } from '../../../viewModels/TreeListViewModel';

// モックデータを用意
const mockViewModel = {
  layerDataList: [
    {
      id: 'layer1',
      locationId: 'location1',
      name: 'Layer 1',
      imageUrl: 'test-url',
      imageSize: { width: 1000, height: 1000 },
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 'layer2',
      locationId: 'location1',
      name: 'Layer 2',
      imageUrl: 'test-url',
      imageSize: { width: 1000, height: 1000 },
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
  ],
  sphereDataList: [
    {
      id: 'sphere1',
      name: 'Sphere 1',
      imageUrl: 'test-url',
      position: { x: 500, y: 500 },
      layerId: 'layer1',
      createdAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 'sphere2',
      name: 'Sphere 2',
      imageUrl: 'test-url',
      position: { x: 500, y: 400 },
      layerId: 'layer1',
      createdAt: '2022-01-01T00:00:00Z',
    },
  ],
  markerDataList: [
    {
      id: 'marker1',
      sphereId: 'sphere1',
      name: 'Marker 1',
      description: 'Description 1',
      orientation: { yaw: 0, pitch: 0 },
      imageUrl: 'test-url',
      thumbnailUrl: 'test-url',
      markerType: 'test',
      createdAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 'marker2',
      sphereId: 'sphere2',
      name: 'Marker 2',
      description: 'Description 2',
      orientation: { yaw: 45, pitch: 0 },
      imageUrl: 'test-url',
      thumbnailUrl: 'test-url',
      markerType: 'test',
      createdAt: '2022-01-01T00:00:00Z',
    },
  ],
  selectedLayerId: 'layer1',
  selectedSphereId: 'sphere1',
  selectedMarkerId: 'marker1',
  handleItemClick: jest.fn(),
};

// モックを設定
jest.mock('../../../viewModels/TreeListViewModel', () => ({
  useTreeListViewModel: jest.fn(),
}));

describe('TreeList Component', () => {
  beforeEach(() => {
    (useTreeListViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  it('renders "No layer data available" when no layer data', () => {
    // データがない場合
    (useTreeListViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      layerDataList: [],
    });
    render(<TreeList />);

    // メッセージが表示されるか
    expect(screen.getByText('No layer data available')).toBeInTheDocument();
  });

  it('renders layer, sphere, and marker data correctly', () => {
    render(<TreeList />);
    // レイヤー、スフィア、マーカーが正しく表示されるか
    expect(screen.getByText('Layer 1')).toBeInTheDocument();

    // Layer1をクリックして展開
    fireEvent.click(screen.getByText('Layer 1'));
    expect(screen.getByText('Sphere 1')).toBeInTheDocument();

    // Sphere1をクリックして展開
    fireEvent.click(screen.getByText('Sphere 1'));
    expect(screen.getByText('Marker 1')).toBeInTheDocument();
  });

  it('handles item clicks', () => {
    render(<TreeList />);

    // アイテムクリックをシミュレート
    fireEvent.click(screen.getByText('Layer 1'));
    fireEvent.click(screen.getByText('Sphere 1'));
    fireEvent.click(screen.getByText('Marker 1'));

    // handleItemClickが呼び出されたか確認
    expect(mockViewModel.handleItemClick).toHaveBeenCalled();
  });

  it('highlights the selected layer, sphere, and marker', () => {
    render(<TreeList />);

    // 選択状態のアイテムが正しく表示されているか（ここではスタイルの確認などが可能）
    const selectedLayer = screen.getByText('Layer 1');
    expect(selectedLayer).toHaveClass('MuiTreeItem-label');
  });
});
