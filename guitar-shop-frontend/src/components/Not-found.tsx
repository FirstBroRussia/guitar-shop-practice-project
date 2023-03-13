import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '../common/enum/route-path.enum';

export default function NotFound() {
  const navigate = useNavigate();

  const onContinueBuyButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    navigate(RoutePathEnum.Main);
  }, []);


  return (
    <section className="error">
      <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
      <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
      <button className="button button__error button--small button--black-border" onClick={onContinueBuyButtonClickHandler} >Продолжить покупки</button>
    </section>
  );
}
