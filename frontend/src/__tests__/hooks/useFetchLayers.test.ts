import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useFetchLayers } from '../../hooks/useFetchLayers';
import { ApiService } from '../../services/apiService';
import { setIsLoading } from '../../store/slices/statusSlice';
import { selectLayerDataList } from '../../store/slices/viewSlice';
import { LayerData } from '../../types/layer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../services/apiService', () => ({
  ApiService: {
    fetchLayers: jest.fn(),
  },
}));

describe('useFetchLayers', () => {
  const mockLayerDataList: LayerData[] = [
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
      locationId: 'location2',
      name: 'Layer 2',
      imageUrl: 'test-url',
      imageSize: { width: 1000, height: 1000 },
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
  ];
  it('should dispatch loading state and fetch layers', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchLayers as jest.Mock).mockResolvedValue(mockLayerDataList); // モックデータ

    await renderHook(() => useFetchLayers());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(
      selectLayerDataList(mockLayerDataList)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });
});
