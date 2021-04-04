import React, {useState, useEffect} from 'react';
import GameboardDOM from './GameboardDOM'
const Game = require('../components/Game');

function GameDOM() {
  const [game] = useState(Game())
  const [player1] = useState(game.getPlayers()[0])
  const [player2] = useState(game.getPlayers()[1])
  const [board1] = useState(game.getBoards()[0])
  const [board2] = useState(game.getBoards()[1])
  const [turn, setTurn] = useState(true)

  const playTurn = (ary, player) => {
    const oppBoard = player === player1 ? board2 : board1;
    player.attack(oppBoard, ary)
    setTurn(t => !turn)
  }

  useEffect(() => {
    if ((player2.getComputer() === true)
    && (turn === false)) {
      console.log('here')
      player2.attack(board1)
      setTurn(t => !turn)
    }
  }, [turn])

  const handleChange = () => {
  //   if ((player2.getComputer() === true)
  //   && (turn === false)) {
  //     console.log('here')
  //     player2.attack(board1)
  //     setTurn(t => !turn)
  //   }
  }

  return (
    //receives opponent's board
    <div className='board-container' onClick={handleChange} > 
      <GameboardDOM board={board1} player={player2} gameOver={game.gameOver} playTurn={playTurn} turn={!turn}/>
      <GameboardDOM board={board2} player={player1} gameOver={game.gameOver} playTurn={playTurn} turn={turn}/>
    </div>
  )
}

export default GameDOM
