import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch } from '../../store/store';


export default function EnterModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const onLoginLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setOpenModalAction(null));
    navigate(RoutePathEnum.Login);
  }, []);

  const onRegisterLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setOpenModalAction(null));
    navigate(RoutePathEnum.Register);
  }, []);

  const onCloseEnterModalButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setOpenModalAction(null));
  }, []);


  return (
    <div style={{position: 'relative', width: 550, height: 500, marginBottom: 50}}>
      <div className="modal is-active modal--enter modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <div className="modal-enter">
              <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
              <Link className="button button--big modal-enter__link" to={RoutePathEnum.Login} onClick={onLoginLinkClickHandler} >Войти</Link>
              <p className="modal-enter__text">Если у вас ещё нет аккаунта, необходимо <br />
                <Link to={RoutePathEnum.Register} onClick={onRegisterLinkClickHandler} >Зарегистрироваться</Link>
              </p>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseEnterModalButtonClickHandler} >
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
