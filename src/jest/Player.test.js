const Player = require('../components/Player');
const Gameboard = require('../components/Gameboard');

jest.mock('../components/Gameboard', () => {
  const MockGameboard = { receiveAttack: jest.fn() };
  return jest.fn(() => MockGameboard);
})

describe('Player', () => {
  let player
  let board 

  beforeEach(() => {
    player = Player();
    board = Gameboard();
    board.receiveAttack.mockImplementation(() => 'Attacked')
    jest.clearAllMocks()
  })

  it('Can attack enemy board', () => {
    player.attack(board, [5,5])
    expect(board.receiveAttack.mock.calls[0][0]).toEqual([5, 5])
  })

  it('Allows players to select target', () => {
    player.attack(board)
    expect(board.receiveAttack.mock.calls[0]).toBeDefined()
  })

  it('Determines if target is a legal move', () => {
    expect(player.isValidAttack([10,10])).toBe(false)
  })

  it("Won't allow multiple attacks to same coord", () => {
    player.attack(board, [2, 3]);
    expect(player.isValidAttack([2, 3])).toBe(false)
  })

  it('Computer player can attack', () => {
    player.togComputer()
    player.attack(board);
    expect(board.receiveAttack.mock.calls[0]).toBeDefined()
  })
})
