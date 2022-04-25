import React from 'react';

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
          <div className="form__input-block">
            <h2 className="form__input-title">Ваш город</h2>
            <div className="form__input-container">
              <input type="text" className="form__input form__input-dropdown" />
              <span className="form__input-error">123</span>
            </div>
          </div>
          <div className="form__input-block">
            <h2 className="form__input-title">Ваш университет</h2>
            <div className="form__input-container">
              <input type="text" className="form__input form__input-dropdown" />
              <span className="form__input-error">123</span>
            </div>
          </div>
        </div>

        <div className="form__inputs">
          <div className="form__input-block">
            <h2 className="form__input-title">Пароль</h2>
            <div className="form__input-container">
              <input type="text" className="form__input" />
              <span className="form__input-error">123</span>
            </div>
            <p className="form__input-info text-info">
              Ваш новый пароль должен содержать не менее 5 символов.
            </p>
          </div>
          <div className="form__input-block">
            <h2 className="form__input-title">Пароль еще раз</h2>
            <div className="form__input-container">
              <input type="text" className="form__input" />
              <span className="form__input-error">123</span>
            </div>
            <p className="form__input-info text-info">
              Повторите пароль, пожалуйста, это обезопасит вас с нами на случай
              ошибки.
            </p>
          </div>
        </div>

        <div className="form__inputs">
          <div className="form__input-block">
            <h2 className="form__input-title">Электронная почта</h2>
            <div className="form__input-container">
              <input type="text" className="form__input" />
              <span className="form__input-error">123</span>
            </div>
            <p className="form__input-info text-info">
              Можно изменить адрес, указанный при регистрации.
            </p>
          </div>
          <div className="form__input-block">
            <h2 className="form__input-title">Я согласен</h2>
            <div className="form__input-container form__input-container_checkbox">
              <input
                type="checkbox"
                id="checkbox"
                className="form__input form__input-checkbox"
              />
              <label htmlFor="checkbox">
                принимать актуальную информацию на емейл
              </label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
