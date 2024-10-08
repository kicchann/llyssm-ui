import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useFetchMarkers } from '../../hooks/useFetchMarkers';
import { ApiService } from '../../services/apiService';
import { setIsLoading } from '../../store/slices/statusSlice';
import { selectMarkerDataList } from '../../store/slices/viewSlice';
import { MarkerData } from '../../types/marker';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../services/apiService', () => ({
  ApiService: {
    fetchMarkers: jest.fn(),
  },
}));

describe('useFetchMarkers', () => {
  const mockData: MarkerData[] = [
    {
      id: 'marker01',
      sphereId: 'sphere01',
      name: 'Marker Name 01',
      description: 'This is marker 01',
      orientation: { yaw: 0, pitch: 0 },
      imageUrl: '/images/image-800x600.png',
      thumbnailUrl: '/images/image-160x120.png',
      markerType: 'default',
      createdAt: '2022-01-01T00:00:00',
    },
    {
      id: 'marker02',
      sphereId: 'sphere01',
      name: 'Marker Name 02',
      description: 'This is marker 02',
      orientation: { yaw: 45, pitch: 10 },
      imageUrl: '/images/image-800x600.png',
      thumbnailUrl: '/images/image-160x120.png',
      markerType: 'default',
      createdAt: '2023-01-01T00:00:00',
    },
  ];
  it('should fetch markers and dispatch actions', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchMarkers as jest.Mock).mockResolvedValue(mockData);

    await renderHook(() => useFetchMarkers());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(selectMarkerDataList(mockData));
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });

  it('should handle fetch markers error', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchMarkers as jest.Mock).mockRejectedValue(
      new Error('Fetch error')
    );

    await renderHook(() => useFetchMarkers());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });
});
