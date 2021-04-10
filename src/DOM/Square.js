import React from 'react'
const classNames = require('classnames');

function Square(props) {
  const { coord, fleetPoss, misses, hits, sunkShips, ghost, player } = props
  const isAMatch = (ary) => {
    for (let i = 0; i < ary.length; i++) {
      if ((ary[i][0] === coord[0]) 
      && (ary[i][1] === coord[1])) {
        return true
      }
    }
  }

  const classes = classNames({
    square: true,
    ghost: isAMatch(ghost),
    ship: isAMatch(fleetPoss) && player.getComputer() === false,
    misses: isAMatch(misses),
    hit: isAMatch(hits),
    sunk: isAMatch(sunkShips),
  }) 

  return (
    <div className={classes}></div>
  )
}

export default Square;
