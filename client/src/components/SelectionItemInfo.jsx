import React from 'react';

const SelectionItemInfo = ({ choice, win, lose }) => (
  <div>
    {`${choice} beats ${win[0]} and ${win[1]}, `}
    {`but loses to ${lose[0]} and ${lose[1]}`}
  </div>
);

export default SelectionItemInfo;
