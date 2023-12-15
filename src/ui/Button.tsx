import React from 'react';

// type ButtonType = {onClick:MouseEvent<HTMLButtonElement>,text:string};

export default function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}
