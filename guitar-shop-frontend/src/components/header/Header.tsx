/* eslint-disable no-nested-ternary */

import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { asyncLogoutAction } from '../../store/async-action/async-action';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';

import Logo from '../logo/Logo';
import Nav from '../nav/Nav';


const HEADER_LOGGED_CLASS = 'header--logged';
const HEADER_ADMIN_LOGGED_CLASS = 'header--admin';


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isAuth = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);
  const username = useAppSelector((state) => state[SliceEnum.UserSlice].username);
  const isAdmin = useAppSelector((state) => state[SliceEnum.UserSlice].isAdmin);

  const productCardCount = useAppSelector((state) => state[SliceEnum.CartSlice].productCartCount);

  const onLoginOrLogoutLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    if (location.pathname === RoutePathEnum.Login || location.pathname === RoutePathEnum.Register) {
      return;
    }

    if (isAuth) {
      dispatch(asyncLogoutAction());

      return;
    }

    dispatch(setOpenModalAction(ModalNameEnum.EnterModal));
  }, [isAuth, location]);

  const onCartLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    if (location.pathname === RoutePathEnum.Login || location.pathname === RoutePathEnum.Register) {
      return;
    }

    if (isAuth) {
      navigate(RoutePathEnum.Cart);

      return;
    }

    dispatch(setOpenModalAction(ModalNameEnum.EnterModal));
  }, [isAuth, location]);


  return (
    <header className={`${ isAuth && isAdmin ? HEADER_ADMIN_LOGGED_CLASS : isAuth && !isAdmin ? HEADER_LOGGED_CLASS : '' } header`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={RoutePathEnum.Main}>
            <Logo />
          </Link>
          <Nav />
          <div className={`header__container ${ location.pathname === RoutePathEnum.Login || location.pathname === RoutePathEnum.Register ? 'events_none' : '' }`}>
            <span className="header__user-name">{username}</span>
            <Link className="header__link" to="#" aria-label="Перейти в личный кабинет" onClick={onLoginOrLogoutLinkClickHandler} >
              <svg className="header__link-icon" width={12} height={14} aria-hidden="true">
                <use xlinkHref="#icon-account" />
              </svg>
              <span className="header__link-text">{`${ isAuth ? 'Выход' : 'Вход' }`}</span>
            </Link>
            <Link className="header__cart-link" to={RoutePathEnum.Cart} aria-label="Перейти в корзину" onClick={onCartLinkClickHandler} >
              <svg className="header__cart-icon" width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-basket" />
              </svg>
              <span className="header__cart-count">{productCardCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
