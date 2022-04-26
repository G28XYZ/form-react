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

export default function Form() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState('');
  const [checkInfo, setCheckInfo] = useState(true);
  const [tooltip, setTooltip] = useState({ text: '', isOpen: false });
  const [stateInputs, setStateInputs] = useState({
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  });

  useEffect(() => {
    setDate(new Date(2012, 5, 15, 14, 55, 17));
    setUser('Человек №3596941');
    setTooltip({ ...tooltip, text: 'Прежде чем действовать, надо понять' });
  }, []);

  function checkEqually() {
    const firstPass: string = stateInputs.password.value;
    const secondPass: string = stateInputs.passwordConfirm.value;
    let { error } = stateInputs.passwordConfirm;
    if (firstPass !== secondPass && !error) {
      error = 'Пароли не совпадают';
    } else if (firstPass === secondPass) {
      error = '';
    }
    setStateInputs({
      ...stateInputs,
      passwordConfirm: {
        ...stateInputs.passwordConfirm,
        error,
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

  const handleClickStatus = useCallback(() => {
    setTooltip({ ...tooltip, isOpen: !tooltip.isOpen });
  }, [tooltip]);

  const handleChangeStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setTooltip({ ...tooltip, text: e.target.value });
    },
    [tooltip],
  );

  return (
    <section className="form">
      <form className="form__container">
        <Header
          user={user}
          handleClickStatus={handleClickStatus}
          tooltipText={tooltip.text}
          tooltipIsOpen={tooltip.isOpen}
          handleChangeStatus={handleChangeStatus}
        />
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

        <div className="form__submit">
          <button
            type="button"
            className="form__submit-button"
            onClick={onSubmit}
          >
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
