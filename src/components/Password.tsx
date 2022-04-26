import React, { ChangeEvent } from 'react';
import Input from './Input';

interface Data {
  error: string;
  value: string;
}

interface Props {
  stateInputs: { [key: string]: Data };
  handleChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPassword: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Password({
  stateInputs,
  handleChangePassword,
  handleConfirmPassword,
}: Props) {
  const firstPassError = stateInputs.password.error;
  const secondPassError = stateInputs.passwordConfirm.error;
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
          value={stateInputs.password.value}
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
          onChange={handleConfirmPassword}
          value={stateInputs.passwordConfirm.value}
        />
      </Input>
    </div>
  );
}
