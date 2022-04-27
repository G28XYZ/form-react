import React, { ChangeEvent, useCallback } from 'react';
import Input from './Input';
import { useStore } from '../context/context';

export default function Email() {
  const [state, dispatch] = useStore();
  const { inputs, checkInfo } = state;

  const handleChangeCheckInfo = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHECK_INFO' });
  }, [checkInfo]);

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const reg = /^\S+@\S+\.\S+$/;

      const error = !reg.test(e.target.value) ? 'Неверный E-mail' : '';
      dispatch({
        type: 'SET_INPUTS',
        payload: {
          [e.target.name]: {
            error: (e.target.validationMessage && 'Укажите E-mail') || error,
            value: e.target.value,
          },
        },
      });
    },
    [inputs],
  );

  const { error } = inputs.email;
  return (
    <div className="form__inputs">
      <Input
        title="Электронная почта"
        selector=""
        error={error}
        textInfo="Можно изменить адрес, указанный при регистрации."
      >
        <input
          name="email"
          type="text"
          className={`form__input ${error && 'form__input_error'}`}
          onChange={handleChangeEmail}
          required
        />
      </Input>

      <Input
        title="Я согласен"
        selector="form__input-container_checkbox"
        error=""
        textInfo=""
      >
        <label htmlFor="checkbox" className="form__input-label">
          <input
            type="checkbox"
            id="checkbox"
            className="form__input form__input-checkbox"
            checked={checkInfo}
            onChange={handleChangeCheckInfo}
          />
          <span>принимать актуальную информацию на email</span>
        </label>
      </Input>
    </div>
  );
}
