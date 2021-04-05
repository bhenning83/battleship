import React, {useState, useEffect} from 'react';
import Square from './Square'
import uniqid from 'uniqid';

function GameboardDOM(props) {
  const {board, player, gameOver, playTurn, turn} = props
  const [fleetPoss] = useState(board.getFleetPoss())
  const [hits, setHits] = useState(board.getHits())
  const [misses, setMisses] = useState(board.getMisses())
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
      let hit = board.getHits()
      let mis = board.getMisses()
      setHits([...hit])
      setMisses([...mis]) //references new array to trigger rerender
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
            <div onClick={() => targetSelected([y - 1, 9 - idx])} key={uniqid()}>
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