import React from 'react';

const ReadyButton = ({ handleClick }) => (
  <button onClick={() => handleClick() }>
    Ready
  </button>
);

export default ReadyButton;
