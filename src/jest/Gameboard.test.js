const Gameboard = require('../components/Gameboard')

describe('Gameboard', () => {
  let board;
  beforeEach(() => {
    board = Gameboard();
    board.createShips();
    return board
  })

  it('Can create ships', () => {
    expect(board.getShips().length).toBe(5)
  })
  
  it('Can place ships', () => {
    const ship = board.getShips()[4];
    board.placeShip(ship, [0, 0], true);
    expect(ship.getPosition()).toEqual({
      0: [0, 0], 
      1: [0, 1]
    })
  })
})