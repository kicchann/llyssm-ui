import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { LayerViewer } from '../../../components/organisms/LayerViewer';
import { useLayerViewerViewModel } from '../../../viewModels/LayerViewerViewModel';

// モックデータの用意
const mockUseLayerViewerViewModel = useLayerViewerViewModel as jest.Mock;

jest.mock('../../../viewModels/LayerViewerViewModel', () => ({
  useLayerViewerViewModel: jest.fn(),
}));

describe('LayerViewer', () => {
  it('renders "No layer selected" when no layer is selected', () => {
    mockUseLayerViewerViewModel.mockReturnValue({
      selectedLayer: null,
      sphereDataList: [],
      handleSphereClick: jest.fn(),
    });

    render(<LayerViewer />);

    expect(screen.getByText('No layer selected')).toBeInTheDocument();
  });

  it('renders layer and sphere pins correctly', () => {
    mockUseLayerViewerViewModel.mockReturnValue({
      selectedLayer: {
        id: 'layer1',
        locationId: 'location1',
        name: 'Test Layer',
        imageUrl: 'test-url',
        imageSize: { width: 1000, height: 1000 },
        createdAt: '2022-01-01T00:00:00Z',
        updatedAt: '2022-01-01T00:00:00Z',
      },
      sphereDataList: [
        {
          id: 'sphere1',
          name: 'Sphere 1',
          imageUrl: 'test-url',
          position: { x: 500, y: 500 },
          createdAt: '2022-01-01T00:00:00Z',
          layerId: 'layer1',
          geoLocation: { latitude: 0, longitude: 0 },
        },
      ],
      handleSphereClick: jest.fn(),
    });

    render(<LayerViewer />);

    expect(screen.getByAltText('Test Layer')).toBeInTheDocument();
    const spherePin = screen.getByTitle('Sphere 1');
    expect(spherePin).toBeInTheDocument();

    // クリックイベントのテスト
    fireEvent.click(spherePin);
    expect(
      mockUseLayerViewerViewModel().handleSphereClick
    ).toHaveBeenCalledWith('sphere1');
  });
});
