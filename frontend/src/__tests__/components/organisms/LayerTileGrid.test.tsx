import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { LayerTileGrid } from '../../../components/organisms/LayerTileGrid';
import { useLayerTileGridViewModel } from '../../../viewModels/LayerTileGridViewModel';

// モックデータを定義
const mockLayerDataList = [
  {
    id: '1',
    locationId: '1',
    name: 'Layer 1',
    imageUrl: 'http://example.com/layer1.png',
    imageSize: { width: 100, height: 100 },
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '2',
    locationId: '2',
    name: 'Layer 2',
    imageUrl: 'http://example.com/layer2.png',
    imageSize: { width: 200, height: 200 },
    createdAt: '2022-01-02T00:00:00Z',
    updatedAt: '2022-01-02T00:00:00Z',
  },
];

// モックのviewModel
jest.mock('../../../viewModels/LayerTileGridViewModel', () => ({
  useLayerTileGridViewModel: jest.fn(),
}));

describe('LayerTileGrid', () => {
  it('renders layer tiles correctly', () => {
    // モックデータを返す
    (useLayerTileGridViewModel as jest.Mock).mockReturnValue({
      layerDataList: mockLayerDataList,
      handleLayerClick: jest.fn(),
    });

    // コンポーネントをレンダリング
    render(<LayerTileGrid />);

    // 各LayerTileが正しくレンダリングされているか確認
    expect(screen.getByText('Layer 1')).toBeInTheDocument();
    expect(screen.getByText('Layer 2')).toBeInTheDocument();
  });

  it('calls handleLayerClick when a LayerTile is clicked', () => {
    const mockHandleLayerClick = jest.fn();

    // モックデータとクリックハンドラを返す
    (useLayerTileGridViewModel as jest.Mock).mockReturnValue({
      layerDataList: mockLayerDataList,
      handleLayerClick: mockHandleLayerClick,
    });

    // コンポーネントをレンダリング
    render(<LayerTileGrid />);

    // LayerTileをクリック
    const layer1Tile = screen.getByText('Layer 1');
    fireEvent.click(layer1Tile);

    // クリックイベントが発火したか確認
    expect(mockHandleLayerClick).toHaveBeenCalledTimes(1);
  });
});
