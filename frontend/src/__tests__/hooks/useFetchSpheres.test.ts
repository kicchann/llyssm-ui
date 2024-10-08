import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useFetchSpheres } from '../../hooks/useFetchSpheres';
import { ApiService } from '../../services/apiService';
import { setIsLoading } from '../../store/slices/statusSlice';
import { selectSphereDataList } from '../../store/slices/viewSlice';
import { SphereData } from '../../types/sphere';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../services/apiService', () => ({
  ApiService: {
    fetchSpheres: jest.fn(),
  },
}));

describe('useFetchSpheres', () => {
  const mockData: SphereData[] = [
    {
      id: 'sphere01',
      layerId: 'layer01',
      name: 'Sphere Name 01',
      imageUrl: '/images/sphere_sample_01.jpg',
      position: {
        x: 500,
        y: 500,
      },
      createdAt: '2021-02-01T00:00:00',
    },
    {
      id: 'sphere02',
      layerId: 'layer01',
      name: 'Sphere Name 02',
      imageUrl: '/images/sphere_sample_02.JPG',
      position: {
        x: 600,
        y: 500,
      },
      createdAt: '2021-03-01T00:00:00',
    },
    {
      id: 'sphere03',
      layerId: 'layer02',
      name: 'Sphere Name 03',
      imageUrl: '/images/sphere_sample_01.jpg',
      position: {
        x: 500,
        y: 500,
      },
      createdAt: '2021-04-01T00:00:00',
    },
  ];
  it('should fetch spheres and dispatch actions', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchSpheres as jest.Mock).mockResolvedValue(mockData);

    await renderHook(() => useFetchSpheres());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(selectSphereDataList(mockData));
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });

  it('should handle fetch spheres error', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchSpheres as jest.Mock).mockRejectedValue(
      new Error('Fetch error')
    );

    await renderHook(() => useFetchSpheres());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });
});
