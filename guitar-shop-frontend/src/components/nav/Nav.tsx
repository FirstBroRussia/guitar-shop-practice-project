/* eslint-disable jsx-a11y/anchor-is-valid */

import { NavLink, useLocation } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { useAppSelector } from '../../store/store';


export default function Nav() {
  const location = useLocation();

  const isAdmin = useAppSelector((state) => state[SliceEnum.UserSlice].isAdmin);

  if (!isAdmin) {
    return (
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <NavLink className={`link main-nav__link ${ location.pathname === RoutePathEnum.Main || location.pathname === RoutePathEnum.Catalog ? 'link--current' : '' }`} to={RoutePathEnum.Main}>
              Каталог
            </NavLink>
          </li>
          <li className="main-nav__item">
            <NavLink className="link main-nav__link" to={RoutePathEnum.Main}>
              Где купить?
            </NavLink>
          </li>
          <li className="main-nav__item">
            <NavLink className="link main-nav__link" to={RoutePathEnum.Main}>
              О компании
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <NavLink className="link main-nav__link" to={RoutePathEnum.Catalog}>Каталог</NavLink>
          </li>
          <li className="main-nav__item">
            <NavLink className="link main-nav__link" to={RoutePathEnum.OrderList}>Список заказов</NavLink>
          </li>
          <li className="main-nav__item">
            <NavLink className="link main-nav__link" to={RoutePathEnum.ProductList}>Список товаров</NavLink>
          </li>
        </ul>
      </nav>
    );
  }

}
