import { SliceEnum } from '../common/enum/slice.enum';
import { asyncGetReviewDataListByProductIdAction } from '../store/async-action/async-action';
import { setIsSendNewReviewAction } from '../store/slice/review.slice';
import { useAppDispatch, useAppSelector } from '../store/store';


export function useCompleteSendNewReview() {
  const dispatch = useAppDispatch();

  const isSendNewReview = useAppSelector((state) => state[SliceEnum.ReviewSlice].isSendNewReview);

  if (!isSendNewReview) {
    return;
  }

  dispatch(asyncGetReviewDataListByProductIdAction());
  dispatch(setIsSendNewReviewAction(false));

}
