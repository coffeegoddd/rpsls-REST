import React from 'react';
import SelectionItem from './SelectionItem';

import styles from '../styles/SelectionMenu.css';

const SelectionMenu = ({ options, handleClickUpdateSelection }) => (
  <ul className={styles.list}>
    {options.map((option) => {
      const { id, choice, winsAgainst, losesTo } = option;
      return <SelectionItem
        key={id}  
        choice={choice}
        win={winsAgainst}
        lose={losesTo}
        handleClickUpdateSelection={handleClickUpdateSelection}
      />;
    })}
  </ul>
);

export default SelectionMenu;
