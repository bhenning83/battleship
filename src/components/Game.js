const Player = require('./Player')
const Gameboard = require('./Gameboard');

const Game = () => {
  const player1 = Player('Player 1', true);
  const player2 = Player('Player 2', false);
  const board1 = Gameboard();
  const board2 = Gameboard();
  board1.initFleet();
  board2.initFleet();

  player2.togComputer()

  const getPlayers = () => [player1, player2];
  const getBoards = () => [board1, board2];

  const togTurn = () => {
    player1.setTurn(!player1.getTurn())
    player2.setTurn(!player2.getTurn())
  }

  const gameOver = (player) => {
    console.log(player.getTitle())
    player1.setTurn(false);
    player2.setTurn(false);
  }

  return {
    getPlayers,
    getBoards,
    togTurn,
    gameOver,
  }
}

module.exports = Game