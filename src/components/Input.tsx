import React from 'react';

interface Props {
  title: string;
  type: string;
  withError: boolean;
  textInfo: string;
  children: any;
}

export default function Input({
  title,
  type,
  withError,
  textInfo,
  children,
}: Props) {
  return (
    <div className="form__input-block">
      <h2 className="form__input-title">{title}</h2>
      <div className={`form__input-container ${type}`}>
        {children}
        {withError && <span className="form__input-error">error</span>}
      </div>
      {textInfo && <p className="form__input-info text-info">{textInfo}</p>}
    </div>
  );
}
