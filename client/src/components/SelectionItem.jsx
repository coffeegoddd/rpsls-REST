import React, { Component } from 'react';
import SelectionItemInfo from './SelectionItemInfo';

import styles from '../styles/SelectionItem.css';

class SelectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfo: false,
    };
    this.handleClick = this.handleClick.bind(this);

    this.capitalizeChoice = {
      rock: 'Rock',
      paper: 'Paper',
      scissors: 'Scissors',
      lizard: 'Lizard',
      spock: 'Spock',
    };
  }

  handleClick() {
    this.setState((state) => {
      return { renderInfo: !state.renderInfo };
    });
  }

  render() {
    const { choice, win, lose, handleClickUpdateSelection } = this.props;
    return (
      <li>
        <button className={styles[choice]} onClick={() => handleClickUpdateSelection(choice) }>{this.capitalizeChoice[choice]}</button>
        {/* <button className={styles.info} onClick={this.handleClick}>?</button> */}
        {/* {this.state.renderInfo ? <SelectionItemInfo choice={choice} win={win} lose={lose}/> : null} */}
      </li>
    );
  }
}

export default SelectionItem;
