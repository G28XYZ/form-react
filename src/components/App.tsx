import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import Header from './Header';
import Places from './Places';
import Email from './Email';
import Password from './Password';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState('');
  const [checkInfo, setCheckInfo] = useState(true);
  const [stateInputs, setStateInputs] = useState({
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  });

  useEffect(() => {
    setDate(new Date(2012, 5, 15, 14, 55, 17));
    setUser('Человек №3596941');
  }, []);

  function checkEqually() {
    const firstPass: string = stateInputs.password.value;
    const secondPass: string = stateInputs.passwordConfirm.value;
    const { error } = stateInputs.passwordConfirm;
    setStateInputs({
      ...stateInputs,
      passwordConfirm: {
        ...stateInputs.passwordConfirm,
        error:
          firstPass !== secondPass && !error ? 'Пароли не совпадают' : error,
      },
    });
  }

  useEffect(checkEqually, [
    stateInputs.password.value,
    stateInputs.passwordConfirm.value,
  ]);

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    [stateInputs],
  );

  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      let error = e.target.value === '' ? 'Укажите пароль' : '';

      if (e.target.name === 'password') {
        const errorLen = e.target.value.length;
        const message = 'Используйте не менее 5 символов';

        error = errorLen < 5 && !error ? message : error;
      }

      setStateInputs({
        ...stateInputs,
        [e.target.name]: {
          value: e.target.value,
          error,
        },
      });
    },
    [stateInputs],
  );

  const handleChangeCheckInfo = useCallback(() => {
    setCheckInfo(!checkInfo);
  }, [checkInfo]);

  function onSubmit(e: SyntheticEvent) {
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
          handleChangePassword={changePassword}
          handleConfirmPassword={changePassword}
        />
        <Email
          stateInputs={stateInputs}
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
