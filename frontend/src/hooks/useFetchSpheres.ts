import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '../services/apiService';
import { setIsLoading } from '../store/slices/statusSlice';
import { selectSphereDataList } from '../store/slices/viewSlice';

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
