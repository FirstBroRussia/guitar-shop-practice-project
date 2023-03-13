import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch } from '../../store/store';


export default function SuccessOrderModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onContinueBuyButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    navigate(RoutePathEnum.Catalog);
    dispatch(setOpenModalAction(null));
  }, []);

  const onExitSuccessOrderModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

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
            <p className="modal__message">Спасибо за ваш заказ!</p>
            <div className="modal__button-container modal__button-container--send">
              <button className="button button--small modal__button modal__button--send" onClick={onContinueBuyButtonClickHandler} >К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onExitSuccessOrderModalButtonClickHandler} ><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
