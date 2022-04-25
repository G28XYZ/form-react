import React from 'react';

interface Props {
  title: string;
  selector: string;
  error: string;
  textInfo: string;
  children: any;
}

export default function Input({
  title,
  selector,
  error,
  textInfo,
  children,
}: Props) {
  return (
    <div className="form__input-block">
      <h2 className="form__input-title">{title}</h2>
      <div className={`form__input-container ${selector}`}>
        {children}
        {error && <span className="form__input-error">{error}</span>}
      </div>
      {textInfo && <p className="form__input-info text-info">{textInfo}</p>}
    </div>
  );
}
