/* eslint-disable no-restricted-globals */

import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { LoginDataType } from '../../common/type/login-data.type';
import { asyncLoginAction } from '../../store/async-action/async-action';
import { useAppDispatch } from '../../store/store';


export default function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const onLoginSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback((evt) => {
    evt.preventDefault();

    const dto: LoginDataType = {
      email: emailInputRef.current?.value as string,
      password: passwordInputRef.current?.value as string,
    };

    dispatch(asyncLoginAction(dto));
  }, []);


  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">Hовый пользователь? <Link className="login__link" to={RoutePathEnum.Register}>Зарегистрируйтесь</Link> прямо сейчас</p>
        <form onSubmit={onLoginSubmitHandler} method="post" action="/">
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input ref={emailInputRef} type="email" id="email" name="email" autoComplete="off" pattern='.*@.*\..{2,5}' required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input ref={passwordInputRef} type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required />
              <button className="input-login__button-eye" type="button">
                <svg width={14} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-eye" />
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">Войти
          </button>
        </form>
      </section>
    </div>
  );
}
