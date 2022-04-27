import React, { ChangeEvent, useCallback } from 'react';
import { useStore } from '../context/context';

export default function Header() {
  const [state, dispatch] = useStore();
  const { user, tooltip } = state;

  const handleClickStatus = useCallback(() => {
    dispatch({ type: 'TOGGLE_TOOLTIP' });
  }, [tooltip]);

  const handleChangeStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      dispatch({ type: 'SET_TOOLTIP', payload: e.target.value });
    },
    [tooltip],
  );
  return (
    <div className="form__header">
      <h1 className="form__header-title">
        Здравствуйте,
        <span className="form__header-user">
          {` ${user}`}
          <div className="form__header-tooltip">
            <p className="form__header-tooltip-text">{tooltip.text}</p>
            <div
              className={`form__header-tooltip-change ${
                tooltip.isOpen && 'form__header-tooltip-change_active'
              }`}
            >
              <input
                type="text"
                className="form__header-input"
                value={tooltip.text}
                onChange={handleChangeStatus}
              />
              <button
                onClick={handleClickStatus}
                type="button"
                className="form__header-close"
              >
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
