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
    player.togComputer();
    player.attack(board, [5,5])
    expect(board.receiveAttack.mock.calls[0][0]).toEqual([5, 5])
  })

  it('Allows players to select target', () => {
    player.togComputer();
    player.attack(board)
    expect(board.receiveAttack.mock.calls[0]).toBeDefined()
  })

  it('Determines if target is a legal move', () => {
    player.togComputer();
    expect(player.attack(board, [10,10])).toBe('Illegal attack')
  })

  it("Won't allow multiple attacks to same coord", () => {
    player.togComputer();
    player.attack(board, [2, 3]);
    expect(player.attack(board, [2, 3])).toBe('Illegal attack')
  })

  it('Computer player can attack', () => {
    player.compAttack(board);
    expect(board.receiveAttack.mock.calls[0]).toBeDefined()
  })
})
