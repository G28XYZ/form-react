import React, { ChangeEvent, useCallback } from 'react';
import Input from './Input';
import { useStore } from '../context/context';

export default function Password() {
  const [state, dispatch] = useStore();
  const { inputs } = state;

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      let error = e.target.value === '' ? 'Укажите пароль' : '';

      if (e.target.name === 'password') {
        const errorLen = e.target.value.length;
        const message = 'Используйте не менее 5 символов';

        error = errorLen < 5 && !error ? message : error;
      }

      dispatch({
        type: 'SET_INPUTS',
        payload: {
          [e.target.name]: {
            value: e.target.value,
            error,
          },
        },
      });
    },
    [inputs],
  );

  const firstPassError = inputs.password.error;
  const secondPassError = inputs.passwordConfirm.error;
  return (
    <div className="form__inputs">
      <Input
        title="Пароль"
        selector=""
        error={firstPassError}
        textInfo="Ваш новый пароль должен содержать не менее 5 символов."
      >
        <input
          name="password"
          type="password"
          minLength={5}
          className={`form__input ${firstPassError && 'form__input_error'}`}
          required
          onChange={handleChangePassword}
          value={inputs.password.value}
        />
      </Input>
      <Input
        title="Пароль еще раз"
        selector=""
        error={secondPassError}
        textInfo="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай
    ошибки."
      >
        <input
          name="passwordConfirm"
          type="password"
          className={`form__input ${secondPassError && 'form__input_error'}`}
          required
          onChange={handleChangePassword}
          value={inputs.passwordConfirm.value}
        />
      </Input>
    </div>
  );
}
