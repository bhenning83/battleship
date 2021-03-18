import React, {useState, useEffect} from 'react';
import Square from './Square'

const Gameboard = require('../components/Gameboard')

function GameboardDOM() {
  const [board, setBoard] = useState(Gameboard());
  const [fleet, setFleet] = useState(board.initFleet())
  const [fleetPoss, setFleetPoss] = useState(board.getFleetPoss())
  const [misses, setMisses] = useState([])
  const [hits, setHits] = useState([])
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }

  const targetSelected = (ary) => {
    board.receiveAttack(ary)
    let mis = board.getMisses()
    let hit = board.getHits()
    setMisses([...mis]) //references new array to trigger rerender
    setHits([...hit])
  }

  return(
    <div className='board'>
      {rows.map((x, idx) => {
        return <div className='row'>
          {x.map(y => {
          return ( 
            <div onClick={() => targetSelected([9 - idx, y - 1])}>
              <Square 
              coord = {[9 - idx, y - 1]}
              fleetPoss = {fleetPoss}
              misses = {misses}
              hits = {hits} />
            </div>
          )
        })}
        </div> 
      })}
    </div>
  )

}

export default GameboardDOM;