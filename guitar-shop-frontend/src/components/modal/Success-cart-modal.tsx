import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { setCurrentTargetAddCartProductDataAction, setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch } from '../../store/store';

export default function SuccessCartModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCartRouteButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    navigate(RoutePathEnum.Cart);
    dispatch(setOpenModalAction(null));
  }, []);

  const onCloseSuccessCartModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setCurrentTargetAddCartProductDataAction(null));
    dispatch(setOpenModalAction(null));
  }, []);


  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button" onClick={onCartRouteButtonClickHandler} >Перейти в корзину</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={onCloseSuccessCartModalButtonClickHandler} >Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseSuccessCartModalButtonClickHandler} >
              <span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
