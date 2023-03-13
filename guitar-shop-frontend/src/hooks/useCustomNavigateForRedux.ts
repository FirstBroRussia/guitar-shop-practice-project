import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SliceEnum } from '../common/enum/slice.enum';
import { setNextRouteNavigateAction } from '../store/slice/data.slice';
import { useAppDispatch, useAppSelector } from '../store/store';

export function useCustomNavigateForRedux() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const targetNextRoute = useAppSelector((state) => state[SliceEnum.DataSlice].nextRouteNavigate);

  useEffect(() => {
    if (targetNextRoute === null) {
      return;
    }

    navigate(targetNextRoute);
    dispatch(setNextRouteNavigateAction(null));
  }, [targetNextRoute]);
}
