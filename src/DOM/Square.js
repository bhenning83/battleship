import React from 'react'
const classNames = require('classnames');

function Square(props) {
  const { coord, fleetPoss, misses, hits } = props
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
    ship: isAMatch(fleetPoss),
    misses: isAMatch(misses),
    hit: isAMatch(hits)
  }) 

  return (
    <div className={classes}></div>
  )
}

export default Square;
