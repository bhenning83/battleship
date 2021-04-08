import React, {useState, useEffect} from 'react';
import Square from './Square'
import uniqid from 'uniqid';

function GameboardDOM(props) {
  const {board, player, playTurn, sunkShips, turn} = props;
  const [counter, setCounter] = useState(0);
  const [vert, setVert] = useState(true);
  const [fleetPoss] = useState(board.getFleetPoss());
  const [fleet] = useState(board.createFleet());
  const [hits, setHits] = useState(board.getHits());
  const [misses, setMisses] = useState(board.getMisses());
  const [ghost, setGhost] = useState([]) //this will indicate where a ship will be during placement
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }
  
  const targetSelected = (ary) => {
    if ((turn === true)
    && player.isValidAttack(ary)) {
      playTurn(ary, player);
      let hit = board.getHits()
      let mis = board.getMisses()
      setHits([...hit])
      setMisses([...mis]) //references new array to trigger rerender
    }
  }

  const placeFleet = (ary) => {
    if (board.placeShip(fleet[counter], ary) !== false) {
      board.placeShip(fleet[counter], ary)
      setCounter(c => counter + 1)
    }
  }

  const handleClick = (ary) => {
    counter < 5 ? placeFleet(ary) : targetSelected(ary);
  }

  return(
    <div className='board'>
      {rows.map((x, idx) => {
        return <div className='row' key={uniqid()}>
          {x.map(y => {
          return ( 
            //need to do 9-idx to 'flip the axis'
            <div key={uniqid()}
            onClick={() => handleClick([y - 1, 9 - idx])} 
            onHover={handleHover([y - 1, 9 - idx])}>
              <Square 
              coord = {[y - 1, 9 - idx]}
              fleetPoss = {fleetPoss}
              misses = {misses}
              hits = {hits}
              sunkShips = {sunkShips} />
            </div>
          )
        })}
        </div> 
      })}
    </div>
  )

}

export default GameboardDOM;

//a counter, first 5 clicks will place ships. downside: it locks them in. 