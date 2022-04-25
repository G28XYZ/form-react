import React from 'react';

export default function App() {
  return (
    <section className="form">
      <form className="form__container">
        <div className="form__header">
          <h1 className="form__title">Здравствуйте, Человек №3596941</h1>
          <div className="form__status">Сменить статус</div>
        </div>
        <div className="form__inputs">
          <div className="form__input-container">
            <h2 className="form__input-title">Ваш город</h2>
            <input type="text" className="form__input form__input-dropdown" />
          </div>
          <div className="form__input-container">
            <h2 className="form__input-title">Ваш университет</h2>
            <input type="text" className="form__input form__input-dropdown" />
          </div>
        </div>
      </form>
    </section>
  );
}
