import React from 'react';
// const Gameboard = require('../components/Gameboard')

function GameboardDOM() {
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }

  return(
    rows.map(x => {
      return x.map(y => {
        return <div className='square'>{y}</div>
      })
    })
  )

}

export default GameboardDOM;