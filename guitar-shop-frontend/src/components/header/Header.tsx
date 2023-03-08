import { Link } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { useAppSelector } from '../../store/store';
import Logo from '../logo/Logo';
import Nav from '../nav/Nav';


export default function Header() {

  const isAuth = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);

  return (
    <header className={`${isAuth ? 'header--admin' : ''} header`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={RoutePathEnum.Main}>
            <Logo />
          </Link>
          <Nav />
          <div className="header__container">
            <span className="header__user-name">Имя</span>
            <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width={12} height={14} aria-hidden="true">
                <use xlinkHref="#icon-account" />
              </svg>
              <span className="header__link-text">Вход</span>
            </a>
            <a className="header__cart-link" href="cart.html" aria-label="Перейти в корзину">
              <svg className="header__cart-icon" width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-basket" />
              </svg>
              <span className="header__cart-count">2</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
