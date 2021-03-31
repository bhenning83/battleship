import React, {useState} from 'react';
import GameboardDOM from './GameboardDOM'
const Game = require('../components/Game');

function GameDOM() {
  const [game] = useState(Game())
  const [player1] = useState(game.getPlayers()[0])
  const [player2] = useState(game.getPlayers()[1])
  const [board1] = useState(game.getBoards()[0])
  const [board2] = useState(game.getBoards()[1])


  return (
    //receives opponent's board
    <div className='board-container'> 
      <GameboardDOM board={board1} player={player2} togTurn={game.togTurn} gameOver={game.gameOver}/>
      <GameboardDOM board={board2} player={player1} togTurn={game.togTurn} gameOver={game.gameOver}/>
    </div>
  )
}

export default GameDOM