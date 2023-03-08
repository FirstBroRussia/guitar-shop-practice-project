export default function Nav() {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <a className="link main-nav__link link--current" href="#">
            Каталог
          </a>
        </li>
        <li className="main-nav__item">
          <a className="link main-nav__link" href="#">
            Где купить?
          </a>
        </li>
        <li className="main-nav__item">
          <a className="link main-nav__link" href="#">
            О компании
          </a>
        </li>
      </ul>
    </nav>
  );
}
