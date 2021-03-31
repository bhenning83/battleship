import React, {useState, useEffect} from 'react';
import Square from './Square'
import uniqid from 'uniqid';


//need to pull the attack/play turn logic out into Game.js. Unable to access other board/player when it's the computer's turn. 
function GameboardDOM(props) {
  const {board, player, togTurn, gameOver} = props
  const [fleetPoss] = useState(board.getFleetPoss())
  const [misses, setMisses] = useState([])
  const [hits, setHits] = useState([])
  const [sunkShips, setSunkShips] = useState([])
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = column
  }

  const playTurn = (ary = []) => {
    player.attack(board, ary)
    let mis = board.getMisses()
    let hit = board.getHits()
    setMisses([...mis]) //references new array to trigger rerender
    setHits([...hit])
    togTurn()
  }
  
  const targetSelected = (ary) => {
    const turn = player.getTurn()
    if (turn === true) {
      if (player.isValidAttack(ary)) {
        playTurn(ary)
      }
    }
  }

  useEffect(() => {
    const turn = player.getTurn()
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