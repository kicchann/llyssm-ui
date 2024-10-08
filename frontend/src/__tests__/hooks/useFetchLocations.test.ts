import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { ApiService } from '../../services/apiService';
import { selectLocationDataList } from '../../store/slices/mapSlice';
import { setIsLoading } from '../../store/slices/statusSlice';
import { LocationData } from '../../types/location';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../services/apiService', () => ({
  ApiService: {
    fetchLocations: jest.fn(),
  },
}));

describe('useFetchLocations', () => {
  const mockLocationDataList: LocationData[] = [
    {
      id: 'location01',
      name: 'Test Location',
      description: 'Test location description',
      geoLocation: { latitude: 35.6895, longitude: 139.6917 },
      iconType: 'default',
    },
    {
      id: 'location02',
      name: 'Test Location 2',
      description: 'Test location description 2',
      geoLocation: { latitude: 35.6895, longitude: 139.6917 },
      iconType: 'default',
    },
  ];
  it('should fetch locations and update the state', async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(
      dispatch
    );
    (ApiService.fetchLocations as jest.Mock).mockResolvedValue(
      mockLocationDataList
    ); // モックデータ

    await renderHook(() => useFetchLocations());

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(
      selectLocationDataList(mockLocationDataList)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsLoading(false));
  });
});
