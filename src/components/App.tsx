import React, { useEffect, useState } from 'react';
import Input from './Input';

export default function App() {
  const [date, setDate] = useState(new Date(2015, 2, 15, 14, 55, 17));
  const [user, setUser] = useState('');
  const [checkInfo, setCheckInfo] = useState(true);

  useEffect(() => {
    setUser('Человек №3596941');
  }, []);

  const [stateInputs, setStateInputs] = useState({
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  });

  function handleChangeEmail(e: any) {
    const reg = /^\S+@\S+\.\S+$/;
    const error = !reg.test(e.target.value) ? 'Неверный E-mail' : '';
    setStateInputs({
      ...stateInputs,
      [e.target.name]: {
        error: (e.target.validationMessage && 'Укажите E-mail') || error,
        value: e.target.value,
      },
    });
  }

  function handleChangePassword(e: any) {
    let error = e.target.value === '' ? 'Укажите пароль' : '';
    error =
      e.target.value.length < 5 && !error
        ? 'Используйте не менее 5 символов'
        : error;
    setStateInputs({
      ...stateInputs,
      password: {
        value: e.target.value,
        error,
      },
    });
  }

  function handleConfirmPassword(e: any) {
    const firstPass = stateInputs.password.value;
    const secondPass = e.target.value;
    let error = e.target.value === '' ? 'Укажите пароль' : '';
    error = firstPass !== secondPass && !error ? 'Пароли не совпадают' : error;
    setStateInputs({
      ...stateInputs,
      passwordConfirm: {
        value: e.target.value,
        error,
      },
    });
  }

  function onSubmit(e: any) {
    e.prevetDefault();
  }

  return (
    <section className="form">
      <form className="form__container">
        <div className="form__header">
          <h1 className="form__header-title">{`Здравствуйте, ${user}`}</h1>
          <div className="form__header-status">Сменить статус</div>
          <div className="form__header-tooltip">
            <p style={{ margin: 0, alignSelf: 'center' }}>
              Прежде чем действовать, надо понять
            </p>
          </div>
        </div>
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
            <input
              name="university"
              type="text"
              className="form__input"
              disabled
            />
          </Input>
        </div>

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="button" className="form__submit" onClick={onSubmit}>
            Изменить
          </button>
          <p className="from__status-info text-info">
            {`последние изменения ${date}`}
          </p>
        </div>
      </form>
    </section>
  );
}
