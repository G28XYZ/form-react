import React, { MouseEvent } from 'react';
import Input from './Input';

interface Props {
  cities: any;
  universities: any;
  handleClickDrop: (event: MouseEvent<HTMLInputElement>) => void;
  handleClickPlace: (p: string, name: string) => void;
  statePlace: any;
}

export default function Places({
  cities,
  universities,
  handleClickDrop,
  statePlace,
  handleClickPlace,
}: Props) {
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
          value={statePlace.city.name}
        />
        <ul
          className={`form__place ${
            statePlace.city.isOpen && 'form__place_open'
          }`}
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
          value={statePlace.university.name}
        />
        <ul
          className={`form__place ${
            statePlace.university.isOpen && 'form__place_open'
          }`}
        >
          {universities.map(({ name }: any, i: number) => (
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
