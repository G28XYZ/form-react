import React from 'react';
import Input from './Input';

interface Props {
  stateInputs: any;
  handleChangePassword: undefined;
  handleConfirmPassword: undefined;
}

export default function Password({
  stateInputs,
  handleChangePassword,
  handleConfirmPassword,
}: any) {
  return (
    <div className="form__inputs">
      <Input
        title="Пароль"
        selector=""
        error={stateInputs.password.error}
        textInfo="Ваш новый пароль должен содержать не менее 5 символов."
      >
        <input
          name="password"
          type="password"
          minLength={5}
          className="form__input"
          required
          onChange={handleChangePassword}
          value={stateInputs.password.value}
        />
      </Input>
      <Input
        title="Пароль еще раз"
        selector=""
        error={stateInputs.passwordConfirm.error}
        textInfo="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай
    ошибки."
      >
        <input
          name="passwordConfirm"
          type="password"
          className="form__input"
          required
          onChange={handleConfirmPassword}
          value={stateInputs.passwordConfirm.value}
        />
      </Input>
    </div>
  );
}
