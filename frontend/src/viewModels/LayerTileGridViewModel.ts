import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../store/slices/statusSlice';
import { selectLayerId } from '../store/slices/viewSlice';
import { RootState } from '../store/store';

export const useLayerTileGridViewModel = () => {
  const dispatch = useDispatch();
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );

  const handleLayerClick = (layerId: string) => {
    console.log(`Layer clicked: ${layerId}`);
    // レイヤークリック時の処理をここに記述
    dispatch(selectLayerId(layerId));
    dispatch(setActiveModal('layer' as 'layer'));
  };

  return {
    layerDataList,
    handleLayerClick,
  };
};
