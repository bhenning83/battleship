const Player = require('./Player')
const Gameboard = require('./Gameboard');

const Game = () => {
  const player1 = Player(true);
  const player2 = Player(false);
  const board1 = Gameboard();
  const board2 = Gameboard();

  const getPlayers = () => [player1, player2];
  const getBoards = () => [board1, board2];

  const togTurn = () => {
    player1.setTurn(!player1.getTurn())
    player2.setTurn(!player2.getTurn())
  }

  return {
    getPlayers,
    getBoards,
    togTurn
  }
}

module.exports = Game