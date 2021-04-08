import React, {useState, useEffect} from 'react';
import GameboardDOM from './GameboardDOM'
import Player from '../components/Player'
import Gameboard from '../components/Gameboard'

function GameDOM() {
  // const [game] = useState(Game())
  const [startGame, setStartGame] = useState(true)
  const [player1] = useState(Player('Player 1', true))
  const [player2] = useState(Player('Player 2', false))
  const [board1] = useState(Gameboard())
  const [board2] = useState(Gameboard())
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

  const checkGameOver = () => {
    //checks each board for a completely sunk fleet
    [board1, board2].forEach(board => {
      if (board.isFleetSunk(board.getFleet())) {

        //locks out the turn so neither player can play
        setTurn(t => 0)
      }
    })
  }
  
  useEffect(() => {
    if (startGame === true) {
      player2.togComputer()
      setStartGame(startGame => !startGame)
    }
    computerPlay()
    let ss1 = board1.getSunkShips();
    let ss2 = board2.getSunkShips();
    setSunkShips1([...ss1])
    setSunkShips2([...ss2])
    checkGameOver()
  }, [turn])

  return (
    //receives opponent's board
    <div> 
      <button onClick={() => player2.togComputer()}>Toggle Computer</button>
      <div className='board-container'>
        <GameboardDOM 
        board={board1} 
        player={player2} 
        playTurn={playTurn} 
        sunkShips={sunkShips1} 
        turn={!turn}/>
        <GameboardDOM 
        board={board2} 
        player={player1} 
        playTurn={playTurn} 
        sunkShips={sunkShips2} 
        turn={turn}/>
      </div>
    </div>
  )
}

export default GameDOM

//GameDom needs to check for validity of attack. Move player.isValidAttack here, and also 
//need to check for repeat attacks. Will need to get prevTargets from player with player.getPrevTargets()
