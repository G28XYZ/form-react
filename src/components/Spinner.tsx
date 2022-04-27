import React from 'react';

export default function Spinner() {
  return (
    <div className="spinner">
      <img
        className="spinner__image"
        src="https://rrav.ru/img/ajax_loading.gif"
        alt="Загрузка..."
      />
    </div>
  );
}
