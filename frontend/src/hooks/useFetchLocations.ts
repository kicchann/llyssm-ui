import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '../services/apiService';
import { selectLocationDataList } from '../store/slices/mapSlice';
import { setIsLoading } from '../store/slices/statusSlice';
import { LocationData } from '../types/map';

export const useFetchLocations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchLocations = async () => {
      try {
        const data: LocationData[] = await ApiService.fetchLocations();
        dispatch(selectLocationDataList(data));
      } catch (error) {
        console.error('Error fetching Locations:', error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchLocations();
  }, [dispatch]);
};
