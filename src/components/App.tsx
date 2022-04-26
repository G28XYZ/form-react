import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import Places from './Places';
import Email from './Email';
import Password from './Password';

type Event<T = any> = EventTarget & T;

export default function App() {
  const [date, setDate] = useState(new Date(2012, 5, 15, 14, 55, 17));
  const [user, setUser] = useState('');
  const [checkInfo, setCheckInfo] = useState(true);
  const [stateInputs, setStateInputs] = useState({
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  });

  useEffect(() => {
    setUser('Человек №3596941');
  }, []);

  const handleChangeEmail = useCallback(
    (e: Event) => {
      const reg = /^\S+@\S+\.\S+$/;
      const error = !reg.test(e.target.value) ? 'Неверный E-mail' : '';
      setStateInputs({
        ...stateInputs,
        [e.target.name]: {
          error: (e.target.validationMessage && 'Укажите E-mail') || error,
          value: e.target.value,
        },
      });
    },
    [setStateInputs],
  );

  const handleChangePassword = useCallback(
    (e: Event) => {
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
    },
    [setStateInputs],
  );

  const handleConfirmPassword = useCallback(
    (e: Event) => {
      const firstPass = stateInputs.password.value;
      const secondPass = e.target.value;
      let error = e.target.value === '' ? 'Укажите пароль' : '';
      error =
        firstPass !== secondPass && !error ? 'Пароли не совпадают' : error;
      setStateInputs({
        ...stateInputs,
        passwordConfirm: {
          value: e.target.value,
          error,
        },
      });
    },
    [setStateInputs],
  );

  const handleChangeCheckInfo = useCallback((): undefined => {
    setCheckInfo(!checkInfo);
    return undefined;
  }, [setCheckInfo]);

  function onSubmit(e: Event) {
    e.preventDefault();
  }

  function getTime() {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <section className="form">
      <form className="form__container">
        <Header user={user} />
        <Places />
        <Password
          stateInputs={stateInputs}
          handleChangePassword={handleChangePassword}
          handleConfirmPassword={handleConfirmPassword}
        />
        <Email
          stateInput={stateInputs}
          checkInfo={checkInfo}
          handleChangeEmail={handleChangeEmail}
          handleChangeCheckInfo={handleChangeCheckInfo}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="button" className="form__submit" onClick={onSubmit}>
            Изменить
          </button>
          <p className="from__status-info text-info">
            {`последние изменения ${getTime()}`}
          </p>
        </div>
      </form>
    </section>
  );
}
