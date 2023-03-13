import { ModalNameEnum } from '../common/enum/modal-name.enum';
import { SliceEnum } from '../common/enum/slice.enum';
import { resetCartSliceStateAction, setIsCompleteSendOrderAction } from '../store/slice/cart.slice';
import { setOpenModalAction } from '../store/slice/modal.slice';
import { useAppDispatch, useAppSelector } from '../store/store';


export function useCompleteSendNewOrder() {
  const dispatch = useAppDispatch();

  const isCompleteSendNewOrder = useAppSelector((state) => state[SliceEnum.CartSlice].isCompleteSendOrder);

  if (!isCompleteSendNewOrder) {
    return;
  }

  dispatch(resetCartSliceStateAction());
  dispatch(setIsCompleteSendOrderAction(null));
  dispatch(setOpenModalAction(ModalNameEnum.SuccessOrderModal));

}
