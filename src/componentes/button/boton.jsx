import React from 'react';

function MyButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.label}
    </button>
  );
}

export default MyButton;
