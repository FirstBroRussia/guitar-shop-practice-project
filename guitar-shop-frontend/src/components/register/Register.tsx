/* eslint-disable no-restricted-globals */

import { useCallback, useRef } from 'react';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { RegisterDataType } from '../../common/type/register-data.type';
import { asyncRegisterAction } from '../../store/async-action/async-action';
import { useAppDispatch } from '../../store/store';


export default function Register() {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const onRegisterFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback((evt) => {
    evt.preventDefault();

    const dto: RegisterDataType = {
      username: usernameInputRef.current?.value as string,
      email: emailInputRef.current?.value as string,
      password: passwordInputRef.current?.value as string,
    };

    dispatch(asyncRegisterAction(dto));
  }, []);


  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <form onSubmit={onRegisterFormSubmitHandler} method="post" action="/">
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input ref={usernameInputRef} type="text" id="name" name="name" autoComplete="off" minLength={ConstantValueEnum.USERNAME_MIN_LENGTH} maxLength={ConstantValueEnum.USERNAME_MAX_LENGTH} required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input ref={emailInputRef} type="email" id="email" name="email" autoComplete="off" pattern='.*@.*\..{2,5}' required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Придумайте пароль</label>
            <span>
              <input ref={passwordInputRef} type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" minLength={ConstantValueEnum.PASSWORD_MIN_LENGTH} maxLength={ConstantValueEnum.PASSWORD_MAX_LENGTH} required />
              <button className="input-login__button-eye" type="button">
                <svg width={14} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-eye" />
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">Зарегистрироваться
          </button>
        </form>
      </section>
    </div>
  );
}
