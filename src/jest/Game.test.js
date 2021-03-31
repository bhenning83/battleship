const Game = require('../components/Game')

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = Game();
  })

  it('initializes players', () => {
    expect(game.getPlayers().length).toBe(2)
  })

  it('initilizes boards', () => {
    expect(game.getBoards().length).toBe(2)
  })

  it('Toggles the turn between players', () => {
    expect(game.getPlayers()[0].getTurn()).toBe(true);
    expect(game.getPlayers()[1].getTurn()).toBe(false);
    game.togTurn();
    expect(game.getPlayers()[0].getTurn()).toBe(false);
    expect(game.getPlayers()[1].getTurn()).toBe(true);
  })
  
})