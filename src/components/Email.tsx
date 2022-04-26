import React, { ChangeEvent } from 'react';
import Input from './Input';

interface Data {
  error: string;
  value: string;
}

interface Props {
  stateInputs: { [key: string]: Data };
  handleChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  checkInfo: boolean;
  handleChangeCheckInfo: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Email({
  stateInputs,
  handleChangeEmail,
  checkInfo,
  handleChangeCheckInfo,
}: Props) {
  const { error } = stateInputs.email;
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
