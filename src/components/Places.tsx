import React, { MouseEvent, useCallback } from 'react';
import Input from './Input';
import { useStore } from '../context/context';

export default function Places() {
  const [state, dispatch] = useStore();
  const { cities, university, place } = state;

  const handleClickPlace = useCallback(
    (p: string, name: string): void => {
      const placeObj = Object.assign(state.place)[p];
      placeObj.name = name;
      dispatch({ type: 'SET_PLACE', payload: { [p]: { ...placeObj } } });
    },
    [place],
  );

  const handleClickDrop = useCallback(
    (e: MouseEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLTextAreaElement;
      const placeObj = Object.assign(state.place)[target.name];
      const toggle = { ...placeObj, isOpen: !placeObj.isOpen };
      dispatch({
        type: 'SET_PLACE',
        payload: { [target.name]: { ...toggle } },
      });
    },
    [place],
  );

  return (
    <div className="form__inputs">
      <Input
        title="Ваш город"
        selector="form__input-dropdown"
        error=""
        textInfo=""
      >
        <input
          style={{ cursor: 'pointer', overflow: 'hidden' }}
          name="city"
          type="text"
          className="form__input"
          readOnly
          onClick={handleClickDrop}
          value={place.city.name}
        />
        <ul
          className={`form__place ${place.city.isOpen && 'form__place_open'}`}
        >
          {cities.map(({ city }: any, i: number) => (
            <li
              key={i}
              onClick={() => handleClickPlace('city', city)}
              className="form__place-item"
            >
              {city}
            </li>
          ))}
        </ul>
      </Input>
      <Input
        title="Ваш университет"
        selector="form__input-dropdown"
        error=""
        textInfo=""
      >
        <input
          style={{ cursor: 'pointer', overflow: 'hidden' }}
          name="university"
          type="text"
          className="form__input"
          readOnly
          onClick={handleClickDrop}
          value={place.university.name}
        />
        <ul
          className={`form__place ${
            place.university.isOpen && 'form__place_open'
          }`}
        >
          {university.map(({ name }: any, i: number) => (
            <li
              key={i}
              onClick={() => handleClickPlace('university', name)}
              className="form__place-item"
            >
              {name}
            </li>
          ))}
        </ul>
      </Input>
    </div>
  );
}
