import React, { MouseEvent } from 'react';

interface Props {
  user: string;
  tooltipText: string;
  tooltipIsOpen: boolean;
  handleClickStatus: (event: MouseEvent<HTMLElement>) => void;
}

export default function Header({
  user,
  handleClickStatus,
  tooltipText,
  tooltipIsOpen,
}: Props) {
  return (
    <div className="form__header">
      <h1 className="form__header-title">
        Здравствуйте,
        <span className="form__header-user">
          {` ${user}`}
          <div className="form__header-tooltip">
            <p className="form__header-tooltip-text">{tooltipText}</p>
            <div
              className={`form__header-tooltip-change ${
                tooltipIsOpen && 'form__header-tooltip-change_active'
              }`}
            >
              <input type="text" className="form__header-input" />
              <button type="button" className="form__header-close">
                X
              </button>
            </div>
          </div>
        </span>
      </h1>
      <button
        onClick={handleClickStatus}
        type="button"
        className="form__header-status"
      >
        Сменить статус
      </button>
    </div>
  );
}
