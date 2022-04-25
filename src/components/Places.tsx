import React from 'react';
import Input from './Input';

export default function Places() {
  return (
    <div className="form__inputs">
      <Input
        title="Ваш город"
        selector="form__input-dropdown"
        error=""
        textInfo=""
      >
        <input name="city" type="text" className="form__input" disabled />
      </Input>
      <Input
        title="Ваш университет"
        selector="form__input-dropdown"
        error=""
        textInfo=""
      >
        <input name="university" type="text" className="form__input" disabled />
      </Input>
    </div>
  );
}
