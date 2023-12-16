import React from 'react';
import style from './Button.module.css';

type ButtonType = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

export default function Button({ onClick, text }: ButtonType) {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  );
}
