import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { getGuitarTypeString } from '../../common/helper/helper';
import { ProductCartType, removeProductInProductCartAction } from '../../store/slice/cart.slice';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';


export default function DeleteCartModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { productData, count } = useAppSelector((state) => state[SliceEnum.CartSlice].targetDeleteProductCartData) as ProductCartType;
  const { id, title, imageLink, article, guitarType, guitarStringsCount, price } = productData;

  const onDeleteProductFromCartButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(removeProductInProductCartAction(id));
    dispatch(setOpenModalAction(null));
  }, [id]);

  const onContinueBuyButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    navigate(RoutePathEnum.Catalog);
    dispatch(setOpenModalAction(null));
  }, []);

  const onExitDeleteCartModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setOpenModalAction(null));
  }, []);


  return (
    <div style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink}`} srcSet={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink.replace('.png', '')}@2x.png 2x`} width={67} height={137} alt={title} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{title}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {article}</p>
                <p className="modal__product-params">{getGuitarTypeString(guitarType)}, {guitarStringsCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Количество:</span><span className="modal__price">{count} шт</span></p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price * count} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={onDeleteProductFromCartButtonClickHandler} >Удалить товар</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={onContinueBuyButtonClickHandler} >Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onExitDeleteCartModalButtonClickHandler} >
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
