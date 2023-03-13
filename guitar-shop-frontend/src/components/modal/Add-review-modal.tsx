import { useCallback, useRef, useState } from 'react';

import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { CreateReviewType } from '../../common/type/create-review.type';
import { ProductCardDataType } from '../../common/type/product-card-data.type';
import { asyncPostNewReviewByProductIdAction } from '../../store/async-action/async-action';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';


export default function AddReviewModal() {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const rateWrapperRef = useRef<HTMLDivElement>(null);
  const anyRateInputRef = useRef<HTMLInputElement>(null);

  const advInputRef = useRef<HTMLInputElement>(null);
  const disadvInputRef = useRef<HTMLInputElement>(null);
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const [inputRateValue, setInputRateValue] = useState<number | null>(null);

  const productCardData = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardData) as ProductCardDataType;


  const onRateInputClickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback((evt) => {
    anyRateInputRef.current?.setCustomValidity('');

    const targetInputElement = (evt.target as HTMLElement).closest('input[name="rate"]') as HTMLInputElement;

    if (!targetInputElement) {
      return;
    }

    setInputRateValue(+targetInputElement.value);
  }, []);

  const onCloseAddReviewModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setOpenModalAction(null));
  }, []);

  const onAddReviewFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback((evt) => {
    evt.preventDefault();

    let checkedRateValue = null;

    rateWrapperRef.current?.childNodes.forEach((item) => {
      const element = (item as HTMLElement);

      if (element.tagName === 'INPUT' && (element as HTMLInputElement).checked) {
        checkedRateValue = +(element as HTMLInputElement).value;
      }
    });

    if (!checkedRateValue) {
      anyRateInputRef.current?.setCustomValidity('Обязательно поставьте оценку!');
      anyRateInputRef.current?.reportValidity();

      return;
    }

    const dto: CreateReviewType = {
      productId: productCardData.id,
      advantages: advInputRef.current?.value as string,
      disadvantages: disadvInputRef.current?.value as string,
      score: checkedRateValue,
      comment: commentTextAreaRef.current?.value as string,
    };

    dispatch(asyncPostNewReviewByProductIdAction(dto));
  }, [inputRateValue]);


  return (
    <div style={{position: 'relative', width: 550, height: 610, marginBottom: 50}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <form ref={formRef} className="form-review" onSubmit={onAddReviewFormSubmitHandler} >
              <div className="form-review__wrapper">
                <h3 className="form-review__title">{productCardData?.title}</h3>
                <div>
                  <span className="form-review__label form-review__label--required form-review__label--star">Ваша Оценка</span>
                  <div ref={rateWrapperRef} className="rate rate--reverse" onClick={onRateInputClickHandler} >
                    <input ref={anyRateInputRef} className="visually-hidden" id="star-5" name="rate" type="radio" defaultValue={5} />
                    <label className="rate__label" htmlFor="star-5" title="Отлично" />
                    <input className="visually-hidden" id="star-4" name="rate" type="radio" defaultValue={4} />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                    <input className="visually-hidden" id="star-3" name="rate" type="radio" defaultValue={3} />
                    <label className="rate__label" htmlFor="star-3" title="Нормально" />
                    <input className="visually-hidden" id="star-2" name="rate" type="radio" defaultValue={2} />
                    <label className="rate__label" htmlFor="star-2" title="Плохо" />
                    <input className="visually-hidden" id="star-1" name="rate" type="radio" defaultValue={1} />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
              <input ref={advInputRef} className="form-review__input" id="advantage" type="text" autoComplete="off" minLength={ConstantValueEnum.ADVANTAGES_MIN_LENGTH} maxLength={ConstantValueEnum.ADVANTAGES_MAX_LENGTH} required />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input ref={disadvInputRef} className="form-review__input" id="disadv" type="text" autoComplete="off" minLength={ConstantValueEnum.DISADVANTAGES_MIN_LENGTH} maxLength={ConstantValueEnum.DISADVANTAGES_MAX_LENGTH} required />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required form-review__label--textarea" htmlFor="comment">Комментарий</label>
              <textarea ref={commentTextAreaRef} className="form-review__input form-review__input--textarea" id="comment" autoComplete="off" defaultValue={''} minLength={ConstantValueEnum.COMMENT_MIN_LENGTH} maxLength={ConstantValueEnum.COMMENT_MAX_LENGTH} required />
              <p className="form-review__warning">Заполните поле</p>
              <button className="button button--medium-20 form-review__button" type="submit" >Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseAddReviewModalButtonClickHandler} >
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
