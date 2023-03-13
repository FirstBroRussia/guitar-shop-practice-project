import { nanoid } from '@reduxjs/toolkit';
import { ConstantValueEnum } from '../../../common/enum/constant-value.enum';
import { getTransformDate } from '../../../common/helper/helper';
import { ReviewDataType } from '../../../common/type/review-data.type';
import EmptyStarSvg from '../../svg/rate/Empty-star.svg';
import FullStarSvg from '../../svg/rate/Full-star.svg';


type ReviewItemPropsType = {
  reviewData: ReviewDataType;
};


export default function ReviewItem({ reviewData }: ReviewItemPropsType) {
  const { username, advantages, disadvantages, score, comment, createdAt } = reviewData;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{username}</h4><span className="review__date">{getTransformDate(createdAt)}</span>
      </div>
      <div className="rate review__rating-panel">
        {
          Array(Math.trunc(score)).fill('').map((_item, index) => <FullStarSvg key={`full-star-${nanoid()}`} />)
        }
        {
          Array(ConstantValueEnum.DEFAULT_RATING_MAX_VALUE - Math.trunc(score)).fill('').map((_item, index) => <EmptyStarSvg key={`empty-star-${nanoid()}`} />)
        }
        <p className="visually-hidden">Оценка: Хорошо</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}
