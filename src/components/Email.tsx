import React from 'react';
import Input from './Input';

export default function Email() {
  return (
    <div className="form__inputs">
      <Input
        title="Электронная почта"
        selector=""
        error={stateInputs.email.error}
        textInfo="Можно изменить адрес, указанный при регистрации."
      >
        <input
          name="email"
          type="text"
          className="form__input"
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
            onChange={() => setCheckInfo(!checkInfo)}
          />
          принимать актуальную информацию на email
        </label>
      </Input>
    </div>
  );
}
