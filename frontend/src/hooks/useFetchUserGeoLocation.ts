import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserGeoLocation } from '../store/slices/mapSlice';
import { setErrorMessage } from '../store/slices/statusSlice';

export const useFetchUserGeoLocation = () => {
  const dispatch = useDispatch();

  const fetchUserGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setUserGeoLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        },
        (error) => {
          dispatch(setErrorMessage('現在位置の取得に失敗しました'));
          console.error('Error retrieving location:', error);
        }
      );
    } else {
      dispatch(
        setErrorMessage('Geolocationがこのブラウザでサポートされていません')
      );
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchUserGeoLocation();
  }, []);
};
