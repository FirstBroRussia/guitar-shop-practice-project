import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { asyncGetReviewDataListByProductIdAction } from '../../store/async-action/async-action';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { setPaginationPageAction } from '../../store/slice/review.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ReviewItem from './review-item/Review-item';


type ReviewListPropsType = {
  productId: string;
};


export default function ReviewList({ productId }: ReviewListPropsType) {
  const dispatch = useAppDispatch();


  const isAuthorization = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);

  const [reviewList, reviewCount] = useAppSelector((state) => state[SliceEnum.ReviewSlice].reviewListAndCount);
  const lastIncomingReviewCount = useAppSelector((state) => state[SliceEnum.ReviewSlice].lastIncomingReviewCount);
  const paginationPageReviewValue = useAppSelector((state) => state[SliceEnum.ReviewSlice].paginationPage);


  const onAddReviewLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    if (isAuthorization) {
      dispatch(setOpenModalAction(ModalNameEnum.AddReviewModal));

      return;
    }

    dispatch(setOpenModalAction(ModalNameEnum.EnterModal));
  }, [isAuthorization]);

  const onUpButtonClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    window.scrollTo(0, 0);
  }, []);

  const onNextReviewButtonClickhandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setPaginationPageAction(paginationPageReviewValue + 1));
    dispatch(asyncGetReviewDataListByProductIdAction(true));
  }, [paginationPageReviewValue]);


  useEffect(() => {
    dispatch(asyncGetReviewDataListByProductIdAction());
  }, []);


  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link className="button button--red-border button--big reviews__sumbit-button" to="#" onClick={onAddReviewLinkClickHandler} >Оставить отзыв</Link>
      {
        reviewList.length > ConstantValueEnum.ZERO_VALUE ? reviewList.map((item) => <ReviewItem key={item.id} reviewData={item} />) : <h3 className="reviews__title title">Нет отзывов</h3>
      }
      { (reviewCount > ConstantValueEnum.DEFAULT_REVIEWS_LIMIT && lastIncomingReviewCount === ConstantValueEnum.DEFAULT_REVIEWS_LIMIT) ? <button className="button button--medium reviews__more-button" onClick={onNextReviewButtonClickhandler} >Показать еще отзывы</button> : null }
      { reviewCount > ConstantValueEnum.ZERO_VALUE ?
        <Link className="button button--up button--red-border button--big reviews__up-button" to="#header" onClick={onUpButtonClickHandler} >Наверх</Link> : null }
    </section>
  );
}
