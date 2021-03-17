import React from 'react'
const classNames = require('classnames');

function Square(props) {
  const { onClick, coord, fleetPoss } = props

  const isAShip = () => {
    for (let i = 0; i < fleetPoss.length; i++) {
      if ((fleetPoss[i][0] === coord[0]) 
      && (fleetPoss[i][1] === coord[1])) {
        return true
      }
    }
  }

  const classes = classNames({
    square: true,
    ship: isAShip(),
  }) 

  return (
    <div className={classes} onClick={() => onClick(coord)}>
    </div>
  )
}

export default Square;
