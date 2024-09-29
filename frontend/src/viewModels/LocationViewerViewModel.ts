import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

export const useLocationViewerViewModel = () => {
  const navigate = useNavigate();
  const userGeoLocation = useSelector(
    (state: RootState) => state.map.userGeoLocation
  );
  const locationDataList = useSelector(
    (state: RootState) => state.map.locationDataList
  );

  const handlePopupClick = (locationId: string) => {
    navigate(`/view/${locationId}`);
  };

  return {
    userGeoLocation,
    locationDataList,
    handlePopupClick,
  };
};
