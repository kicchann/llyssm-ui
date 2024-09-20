import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '../services/apiService';
import {
  selectSphereDataList,
  setIsLoading,
} from '../store/slices/viewerSlice';

export const useFetchSpheres = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchSpheres = async () => {
      try {
        const data = await ApiService.fetchSpheres();
        dispatch(selectSphereDataList(data));
      } catch (error) {
        console.error('Error fetching spheres:', error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchSpheres();
  }, [dispatch]);
};
