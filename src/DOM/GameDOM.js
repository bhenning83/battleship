import React, {useState, useEffect} from 'react';
import GameboardDOM from './GameboardDOM'
const Game = require('../components/Game');

function GameDOM() {
  const [game] = useState(Game())
  const [player1] = useState(game.getPlayers()[0])
  const [player2] = useState(game.getPlayers()[1])
  const [board1] = useState(game.getBoards()[0])
  const [board2] = useState(game.getBoards()[1])
  const [sunkShips1, setSunkShips1] = useState(board1.getSunkShips())
  const [sunkShips2, setSunkShips2] = useState(board2.getSunkShips())
  const [turn, setTurn] = useState(true)

  const playTurn = async(ary, player) => {
    const oppBoard = player === player1 ? board2 : board1;
    if (player.isValidAttack(ary)) {
      await player.attack(oppBoard, ary)
      setTurn(t => !turn)
    }
  }

  const computerPlay = async () => {
    if ((player2.getComputer() === true)
    && (turn === false)) {
      await player2.attack(board1)
      setTurn(t => !turn)
    }
  }
  
  useEffect(() => {
    computerPlay()
    let ss1 = board1.getSunkShips();
    let ss2 = board2.getSunkShips();
    setSunkShips1([...ss1])
    setSunkShips2([...ss2])
  }, [turn])

  return (
    //receives opponent's board
    <div className='board-container'> 
      <GameboardDOM 
      board={board1} 
      player={player2} 
      gameOver={game.gameOver} 
      playTurn={playTurn} 
      sunkShips={sunkShips1} 
      turn={!turn}/>
      <GameboardDOM 
      board={board2} 
      player={player1} 
      gameOver={game.gameOver} 
      playTurn={playTurn} 
      sunkShips={sunkShips2} 
      turn={turn}/>
    </div>
  )
}

export default GameDOM

//GameDom needs to check for validity of attack. Move player.isValidAttack here, and also 
//need to check for repeat attacks. Will need to get prevTargets from player with player.getPrevTargets()
