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
      rock: 'ROCK',
      paper: 'PAPER',
      scissors: 'SCISSORS',
      lizard: 'LIZARD',
      spock: 'SPOCK',
    };
  }

  handleClick() {
    this.setState((state) => {
      return { renderInfo: !state.renderInfo };
    });
  }

  render() {
    const { choice, win, lose, handleClickUpdateSelection } = this.props;
    const hoverMap = {
      rock: {
        enter: () => {
          const l = document.getElementById('lizard');
          const sc = document.getElementById('scissors');
          const p = document.getElementById('paper'); 
          const sp = document.getElementById('spock');

          l.classList.add(styles.victory);
          sc.classList.add(styles.victory);
          p.classList.add(styles.defeat);
          sp.classList.add(styles.defeat);
        },
        leave: () => {
          const l = document.getElementById('lizard');
          const sc = document.getElementById('scissors');
          const p = document.getElementById('paper'); 
          const sp = document.getElementById('spock');

          l.classList.remove(styles.victory);
          sc.classList.remove(styles.victory);
          p.classList.remove(styles.defeat);
          sp.classList.remove(styles.defeat);
        }
      },
      paper: {
        enter: () => {
          const r = document.getElementById('rock'); 
          const sp = document.getElementById('spock');
          const l = document.getElementById('lizard');
          const sc = document.getElementById('scissors');

          r.classList.add(styles.victory);
          sp.classList.add(styles.victory);
          l.classList.add(styles.defeat);
          sc.classList.add(styles.defeat);
        },
        leave: () => {
          const r = document.getElementById('rock'); 
          const sp = document.getElementById('spock');
          const l = document.getElementById('lizard');
          const sc = document.getElementById('scissors');

          r.classList.remove(styles.victory);
          sp.classList.remove(styles.victory);
          l.classList.remove(styles.defeat);
          sc.classList.remove(styles.defeat);
        }
      },
      scissors: {
        enter: () => {
          const l = document.getElementById('lizard');
          const p = document.getElementById('paper');
          const r = document.getElementById('rock'); 
          const sp = document.getElementById('spock');

          l.classList.add(styles.victory);
          p.classList.add(styles.victory);
          r.classList.add(styles.defeat);
          sp.classList.add(styles.defeat);
        },
        leave: () => {
          const l = document.getElementById('lizard');
          const p = document.getElementById('paper');
          const r = document.getElementById('rock'); 
          const sp = document.getElementById('spock');

          l.classList.remove(styles.victory);
          p.classList.remove(styles.victory);
          r.classList.remove(styles.defeat);
          sp.classList.remove(styles.defeat);
        }
      },
      lizard: {
        enter: () => {
          const p = document.getElementById('paper');
          const sp = document.getElementById('spock');
          const r = document.getElementById('rock');
          const sc = document.getElementById('scissors');

          p.classList.add(styles.victory);
          sp.classList.add(styles.victory);
          r.classList.add(styles.defeat);
          sc.classList.add(styles.defeat);
        },
        leave: () => {
          const p = document.getElementById('paper');
          const sp = document.getElementById('spock');
          const r = document.getElementById('rock');
          const sc = document.getElementById('scissors');

          p.classList.remove(styles.victory);
          sp.classList.remove(styles.victory);
          r.classList.remove(styles.defeat);
          sc.classList.remove(styles.defeat);
        }
      },
      spock: {
        enter: () => {
          const r = document.getElementById('rock'); 
          const sc = document.getElementById('scissors');
          const l = document.getElementById('lizard');
          const p = document.getElementById('paper');

          r.classList.add(styles.victory);
          sc.classList.add(styles.victory);
          l.classList.add(styles.defeat);
          p.classList.add(styles.defeat);
        },
        leave: () => {
          const r = document.getElementById('rock'); 
          const sc = document.getElementById('scissors');
          const l = document.getElementById('lizard');
          const p = document.getElementById('paper');

          r.classList.remove(styles.victory);
          sc.classList.remove(styles.victory);
          l.classList.remove(styles.defeat);
          p.classList.remove(styles.defeat);
        }
      },
    };

    return (
      <li>
        <div onMouseEnter={hoverMap[choice].enter} onMouseLeave={hoverMap[choice].leave} id={choice} className={styles[choice]} onClick={() => handleClickUpdateSelection(choice) }>{this.capitalizeChoice[choice]}</div>
        {/* <button className={styles.info} onClick={this.handleClick}>?</button> */}
        {/* {this.state.renderInfo ? <SelectionItemInfo choice={choice} win={win} lose={lose}/> : null} */}
      </li>
    );
  }
}

export default SelectionItem;
