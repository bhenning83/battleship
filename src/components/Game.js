const Player = require('./Player')
const Gameboard = require('./Gameboard');

const Game = () => {
  const player1 = Player('Player 1', true);
  const player2 = Player('Player 2', false);
  const board1 = Gameboard();
  const board2 = Gameboard();
  board1.initFleet();
  board2.initFleet();
  
  const getPlayers = () => [player1, player2];
  const getBoards = () => [board1, board2];

  
  const gameOver = (player) => {
    player1.setTurn(false);
    player2.setTurn(false);
  }

  // const playTurn = (ary, player) => {
  //   const oppBoard = player === player1 ? board2 : board1;
  //   player.attack(oppBoard, ary)
  //   togTurn();
  //   if (player2.getComputer() === true) {
  //     player2.attack(board1)
  //     togTurn();
  //   }
  // }

  
  player2.togComputer()
  return {
    getPlayers,
    getBoards,
    gameOver,
  }
}

module.exports = Game