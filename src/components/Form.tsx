import React, { useEffect, FormEvent } from 'react';
import Header from './Header';
import Places from './Places';
import Email from './Email';
import Password from './Password';
import Spinner from './Spinner';
import api from '../utils/Api';
import { useStore } from '../context/context';

export default function Form() {
  const [state, dispatch] = useStore();

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
        ([universities, cities]) => new Promise((resolve, reject) => {
          const normalize = normalizeCities(cities);
          if (normalize) {
            resolve([normalize, universities]);
            return;
          }
          reject(new Error('Ошибка'));
        }),
      )
      .then(([cities, university]) => {
        dispatch({ type: 'SET_CITIES', payload: cities });
        dispatch({ type: 'SET_UNIVERSITIES', payload: university });
        dispatch({
          type: 'SET_PLACE',
          payload: {
            city: { name: cities[0].city, isOpen: false },
            university: { name: university[0].name, isOpen: false },
          },
        });
        dispatch({
          type: 'SET_DATE',
          payload: new Date(2012, 5, 15, 14, 55, 17),
        });
        dispatch({ type: 'SET_USER', payload: 'Человек №3596941' });
        dispatch({
          type: 'SET_TOOLTIP',
          payload: 'Прежде чем действовать, надо понять',
        });
        dispatch({ type: 'LOADING', payload: false });
      })
      .catch((err) => alert(`Error: ${err}`));
  }, []);

  function checkEqually() {
    const firstPass: string = state.inputs.password.value;
    const secondPass: string = state.inputs.passwordConfirm.value;
    let { error } = state.inputs.passwordConfirm;
    if (firstPass !== secondPass && !error) {
      error = 'Пароли не совпадают';
    } else if (firstPass === secondPass) {
      error = '';
    }

    dispatch({
      type: 'SET_INPUTS',
      payload: {
        passwordConfirm: {
          ...state.inputs.passwordConfirm,
          error,
        },
      },
    });
  }

  useEffect(checkEqually, [
    state.inputs.password.value,
    state.inputs.passwordConfirm.value,
  ]);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputs = Object.assign(state.inputs);
    const keys = Object.keys(inputs);
    // проверка валидности инпутов
    for (let i = 0; i < keys.length; i++) {
      const { error, value } = inputs[keys[i]];
      if (error || !value) {
        return;
      }
    }
    const formJson = JSON.stringify({
      status: state.tooltip.text,
      city: state.place.city.name,
      university: state.place.university.name,
      email: inputs.email.value,
      password: inputs.password.value,
      checkInfo: state.checkInfo,
    });
    api.postForm(formJson);
    dispatch({ type: 'SET_DATE' });
  };

  function getTime() {
    const { date } = state;
    const [day, mounth, year] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];
    const [hour, minute, second] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    return `${day}/${mounth}/${year} в ${hour}:${minute}:${second}`;
  }

  return (
    <section className="form">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <form className="form__container" onSubmit={onSubmit}>
          <Header />
          <Places />
          <Password />
          <Email />

          <div className="form__submit">
            <button type="submit" className="form__submit-button">
              Изменить
            </button>
            <p className="from__status-info text-info">
              {`последние изменения ${getTime()}`}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
