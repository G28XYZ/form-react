import React from 'react';
import Input from './Input';

export default function App() {
  return (
    <section className="form">
      <form className="form__container">
        <div className="form__header">
          <h1 className="form__header-title">Здравствуйте, Человек №3596941</h1>
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
            type="form__input-dropdown"
            withError={false}
            textInfo=""
          >
            <input type="text" className="form__input" disabled />
          </Input>
          <Input
            title="Ваш университет"
            type="form__input-dropdown"
            withError={false}
            textInfo=""
          >
            <input type="text" className="form__input" disabled />
          </Input>
        </div>

        <div className="form__inputs">
          <Input
            title="Пароль"
            type=""
            withError
            textInfo="Ваш новый пароль должен содержать не менее 5 символов."
          >
            <input type="text" className="form__input" />
          </Input>
          <Input
            title="Пароль еще раз"
            type=""
            withError
            textInfo="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай
            ошибки."
          >
            <input type="text" className="form__input" />
          </Input>
        </div>

        <div className="form__inputs">
          <Input
            title="Электронная почта"
            type=""
            withError
            textInfo="Можно изменить адрес, указанный при регистрации."
          >
            <input type="text" className="form__input" />
          </Input>

          <Input
            title="Я согласен"
            type="checkbox"
            withError={false}
            textInfo=""
          >
            <input
              type="checkbox"
              id="checkbox"
              className="form__input form__input-checkbox"
            />
            <label htmlFor="checkbox">
              принимать актуальную информацию на емейл
            </label>
          </Input>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="form__submit" onClick={() => ''}>
            Изменить
          </button>
          <p className="text-info">
            последние изменения 15 мая 2012 в 14:55:17
          </p>
        </div>
      </form>
    </section>
  );
}
