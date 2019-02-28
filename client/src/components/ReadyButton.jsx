import React from 'react';
import styles from '../styles/ReadyButton.css';

const ReadyButton = ({ handleClick }) => (
  <button className={styles.ready} onClick={() => handleClick() }>
    Ready
  </button>
);

export default ReadyButton;
