import React, {useState, useEffect} from 'react';
import Square from './Square'

const Gameboard = require('../components/Gameboard')

function GameboardDOM() {
  const [board, setBoard] = useState(Gameboard());
  const [fleet, setFleet] = useState(board.initFleet())
  const [fleetPoss, setFleetPoss] = useState([])
  const [misses, setMisses] = useState([])
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }

  const targetSelected = (ary) => {
    console.log(ary)
  }

  useEffect(() => {
    setFleetPoss(board.getFleetPoss())
  }, [board])


  return(
    <div className='board'>
      {rows.map((x, idx) => {
        return <div className='row'>
          {x.map(y => {
          return ( 
          <Square onClick = {targetSelected} 
          coord = {[9 - idx, y - 1]}
          fleetPoss = {fleetPoss} />
          )
        })}
        </div> 
      })}
    </div>
  )

}

export default GameboardDOM;