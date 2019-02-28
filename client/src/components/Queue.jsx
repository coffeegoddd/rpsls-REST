import React from 'react';

const Queue = ({ queue }) => {
  let items, q;
  if (queue.length) {
    q = 'Queue';
    items = queue.map((player, index) => <li key={index + 200}>{player}</li>);
  }
  return (
    <div>
      {q}
      <ol>
        {items}
      </ol>
    </div>
  );
};

export default Queue;
