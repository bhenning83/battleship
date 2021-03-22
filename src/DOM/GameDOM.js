import React, {useState} from 'react';
import GameboardDOM from './GameboardDOM'
const Game = require('../components/Game');

function GameDOM() {
  const [game, setGame] = useState(Game())
  const [player1, setPlayer1] = useState(game.getPlayers()[0])
  const [player2, setPlayer2] = useState(game.getPlayers()[1])
  const [board1, setBoard1] = useState(game.getBoards()[0])
  const [board2, setBoard2] = useState(game.getBoards()[1])


  return (
    //receives opponent's board
    <div className='board-container'>
      <GameboardDOM board={board2} player={player1} togTurn={game.togTurn}/>
      <GameboardDOM board={board1} player={player2} togTurn={game.togTurn}/>
    </div>
  )
}

export default GameDOM