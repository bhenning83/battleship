import React, {useState, useEffect} from 'react';
import Square from './Square'
import uniqid from 'uniqid';

function GameboardDOM(props) {
  const {board, player, gameOver, playTurn, turn} = props
  const [fleetPoss] = useState(board.getFleetPoss())
  const [misses, setMisses] = useState(board.getMisses())
  const [hits, setHits] = useState(board.getHits())
  const [sunkShips, setSunkShips] = useState([])
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }
  
  const targetSelected = (ary) => {
    if ((turn === true)
    && player.isValidAttack(ary)) {
      playTurn(ary, player);
      let mis = board.getMisses()
      let hit = board.getHits()
      setMisses([...mis]) //references new array to trigger rerender
      setHits([...hit])
    }
  }

  useEffect(() => {
    const ss = board.getSunkShips();
    setSunkShips([...ss])
    if (board.isFleetSunk(board.getFleet())) {
      gameOver(player)
    }
  }, [hits]);

  return(
    <div className='board'>
      {rows.map((x, idx) => {
        return <div className='row' key={uniqid()}>
          {x.map(y => {
          return ( 
            //need to do 9-idx to 'flip the axis'
            <div onClick={() => targetSelected([9 - idx, y - 1])} key={uniqid()}>
              <Square 
              coord = {[9 - idx, y - 1]}
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

//it's not rerendering because the misses and set states are only set on a target selected click. 
//need to fetch them from the board.getMisses()