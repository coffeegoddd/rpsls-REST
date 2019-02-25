import React, { Component } from 'react';
import SelectionItemInfo from './SelectionItemInfo';

class SelectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfo: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
        <button onClick={() => handleClickUpdateSelection(choice) }>{choice}</button>
        <button onClick={this.handleClick}>?</button>
        {this.state.renderInfo ? <SelectionItemInfo choice={choice} win={win} lose={lose}/> : null}
      </li>
    );
  }
}

export default SelectionItem;
