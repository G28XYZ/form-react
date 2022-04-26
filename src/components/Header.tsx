import React from 'react';

interface Props {
  user: string;
}

export default function Header({ user }: Props) {
  return (
    <div className="form__header">
      <h1 className="form__header-title">
        Здравствуйте,
        <span className="form__header-user">
          {` ${user}`}
          <div className="form__header-tooltip">
            <p className="form__header-tooltip-text">
              Прежде чем действовать, надо понять
            </p>
          </div>
        </span>
      </h1>
      <button type="button" className="form__header-status">
        Сменить статус
      </button>
    </div>
  );
}
