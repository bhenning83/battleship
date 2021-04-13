import React, {useState, useEffect} from 'react';
import GameboardDOM from './GameboardDOM';
import Player from '../components/Player';
import Gameboard from '../components/Gameboard';
import NameBox from './NameBox';

function GameDOM() {
  const [gameSetup, setgameSetup] = useState(false)
  const [player1] = useState(Player(true))
  const [player2] = useState(Player(false))
  const [board1] = useState(Gameboard())
  const [board2] = useState(Gameboard())
  const [fleet1, setFleet1] = useState([])
  const [fleet2, setFleet2] = useState([])
  const [sunkShips1, setSunkShips1] = useState([])
  const [sunkShips2, setSunkShips2] = useState([])
  const [turn, setTurn] = useState(true)

  const playTurn = (ary, attacker) => {
    const oppBoard = attacker === player1 ? board2 : board1;
    if (board1.isFleetPlaced() && board2.isFleetPlaced()) {
      attacker.attack(oppBoard, ary)
      setTurn(t => !turn)
    }
  }

  const computerPlay = async() => {
    if ((player2.getComputer() === true)
    && (turn === false)) {
      await player2.attack(board1)
      await setTurn(t => !turn)
    }
  }

  const checkGameOver = () => {
    //checks each board for a completely sunk fleet
    [board1, board2].forEach(board => {
      if (board.isFleetSunk(board.getFleet())) {

        //locks out the turn so neither player can play
        setTurn(t => 0)
        let winner = board === board2 ? player1 : player2;
        document.querySelector('.announcement').textContent = `${winner.getTitle()} is the winner!`
      }
    })
  }

  const gameInPlay = () => {
    if (board1.isFleetPlaced() && board2.isFleetPlaced()) {
      document.querySelector('.announcement').textContent = 'Fire at will'
    }
  }
  
  useEffect(() => {
    if (gameSetup === false) {
      player2.togComputer();
      setFleet1(board1.createFleet())
      setFleet2(board2.initFleet())
      setgameSetup(gameSetup => !gameSetup)
    }
    computerPlay()
    let ss1 = board1.getSunkShips();
    let ss2 = board2.getSunkShips();
    setSunkShips1([...ss1])
    setSunkShips2([...ss2])
    checkGameOver()
  }, [turn])

  return (
    <div> 
      <button onClick={() => player2.togComputer()}>Toggle Computer</button>
      <div className={'announcement'} style={{textAlign: 'center', border: '1px solid black'}}>Place yer ships</div>
      <div>
        <NameBox player={player1} id='title1'/>
        <NameBox player={player2} id='title2'/>
      </div>
      <div className='board-container'>
        <GameboardDOM 
        board={board1}   
        player={player1} 
        attacker={player2}
        playTurn={playTurn} 
        sunkShips={sunkShips1} 
        turn={!turn}
        fleet={fleet1}
        gameInPlay={gameInPlay}/>
        <GameboardDOM 
        board={board2}  
        player={player2} 
        attacker={player1}
        playTurn={playTurn} 
        sunkShips={sunkShips2} 
        turn={turn}
        fleet={fleet2}/>
      </div>
    </div>
  )
}

export default GameDOM

