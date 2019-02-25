import React from 'react';
import SelectionMenu from './SelectionMenu';

const GameController = ({ options, handleClickUpdateSelection }) => {
  return (
    <div>
      <div>Make your selection</div>
      <SelectionMenu options={options} handleClickUpdateSelection={handleClickUpdateSelection}/>
    </div>
  );
};

export default GameController;
