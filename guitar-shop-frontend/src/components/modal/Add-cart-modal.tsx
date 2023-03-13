/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback } from 'react';

import { BACKEND_URL } from '../../common/api/axios.api';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { getGuitarTypeString } from '../../common/helper/helper';
import { addProductInProductCartAction } from '../../store/slice/cart.slice';
import { setCurrentTargetAddCartProductDataAction, setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const transformBackendUrl = BACKEND_URL.replace('/api', '');


export default function AddCartModal() {
  const dispatch = useAppDispatch();

  const productCardData = useAppSelector((state) => state[SliceEnum.ModalSlice].currentTargetAddCartProductData);

  const onAddCartButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(addProductInProductCartAction(productCardData!));
    dispatch(setOpenModalAction(ModalNameEnum.SuccessCartModal));
  }, []);

  const onCloseAddCartModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setCurrentTargetAddCartProductDataAction(null));
    dispatch(setOpenModalAction(null));
  }, []);

  if (!productCardData) {
    return null;
  }

  const { title, imageLink, article, guitarType, guitarStringsCount, price } = productCardData;


  return (
    <div style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info"><img className="modal__img" src={`${transformBackendUrl}${imageLink}`} srcSet={`${transformBackendUrl}${imageLink.replace('.png', '')}@2x.png 2x`} width={67} height={137} alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{title}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {article}</p>
                <p className="modal__product-params">{`${getGuitarTypeString(guitarType)}, ${guitarStringsCount} струнная`}</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={onAddCartButtonClickHandler} >Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseAddCartModalButtonClickHandler} >
              <span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
