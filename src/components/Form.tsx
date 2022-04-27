import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
  MouseEvent,
} from 'react';
import Header from './Header';
import Places from './Places';
import Email from './Email';
import Password from './Password';
import api from '../utils/Api';

export default function Form() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState('');
  const [cities, setCities] = useState([]);
  const [university, setUniversity] = useState([]);
  const [checkInfo, setCheckInfo] = useState(true);
  const [tooltip, setTooltip] = useState({ text: '', isOpen: false });
  const [place, setPlace] = useState({
    city: { name: '', isOpen: false },
    university: { name: '', isOpen: false },
  });
  const [stateInputs, setStateInputs] = useState({
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  });

  const normalizeCities = (obj: any) => {
    const object = JSON.parse(JSON.stringify(obj));
    const filtered = Object.keys(object)
      .map((i) => object[i])
      .filter((item) => +item.population > 50000);
    const sorted = filtered.sort((a, b) => a.city - b.city);
    const maxPopulation = sorted.reduce(
      (p, c) => (+p.population < +c.population ? c : p),
      { population: 0 },
    );
    const index = sorted.findIndex((item) => maxPopulation.city === item.city);
    const populationToFirst = [
      sorted[index],
      ...sorted.slice(0, index),
      ...sorted.slice(index + 1),
    ];
    return populationToFirst;
  };

  useEffect(() => {
    Promise.all([api.getUniversity(), api.getCities()])
      .then(
        ([_universities, _cities]) =>
          new Promise((resolve, reject) => {
            const normalize = normalizeCities(_cities);
            if (normalize) {
              return resolve([normalize, _universities]);
            }
            return reject(new Error('Ошибка'));
          }),
      )
      .then(([c, u]) => {
        setCities(c);
        setUniversity(u);
        setPlace({
          city: { name: c[0].city, isOpen: false },
          university: { name: u[0].name, isOpen: false },
        });
        setDate(new Date(2012, 5, 15, 14, 55, 17));
        setUser('Человек №3596941');
        setTooltip({ ...tooltip, text: 'Прежде чем действовать, надо понять' });
      })
      .catch((err) => alert(`Error: ${err}`));
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

  const handleClickPlace = useCallback(
    (p: string, name: string): void => {
      const placeObj = Object.assign(place)[p];
      placeObj.name = name;
      setPlace({ ...place, [p]: { ...placeObj } });
    },
    [place],
  );

  const handleClickDrop = useCallback(
    (e: MouseEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLTextAreaElement;
      const placeObj = Object.assign(place)[target.name];
      const toggle = { ...placeObj, isOpen: !placeObj.isOpen };
      setPlace({
        ...place,
        [target.name]: { ...toggle },
      });
    },
    [place],
  );

  const handleChangeCheckInfo = useCallback(() => {
    setCheckInfo(!checkInfo);
  }, [checkInfo]);

  const onSubmit = useCallback((e: SyntheticEvent): void => {
    e.preventDefault();
    const inputs = Object.assign(stateInputs);
    const keys = Object.keys(inputs);
    // проверка валидности инпутов
    for (let i = 0; i < keys.length; i + 1) {
      const { error, value } = inputs[keys[i]];
      if (error || !value) {
        return;
      }
    }
    setDate(new Date());
  }, []);

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
        <Places
          cities={cities}
          universities={university}
          handleClickDrop={handleClickDrop}
          handleClickPlace={handleClickPlace}
          statePlace={place}
        />
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
