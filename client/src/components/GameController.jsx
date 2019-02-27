import React from 'react';
import SelectionMenu from './SelectionMenu';

import styles from '../styles/GameController.css';

const GameController = ({ options, handleClickUpdateSelection }) => {
  return (
    <div className={styles.text}>
      <div className={styles.makeSelection}>Make your selection</div>
      <SelectionMenu options={options} handleClickUpdateSelection={handleClickUpdateSelection}/>
    </div>
  );
};

export default GameController;
