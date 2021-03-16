const Gameboard = require('../components/Gameboard')

describe('Gameboard', () => {
  let board;
  beforeEach(() => {
    board = Gameboard();
    board.createFleet();
    return board
  })

  it('Can create ships', () => {
    expect(Object.values(board.getFleet()).length).toBe(5)
  })
  
  it('Can place ships', () => {
    const ship = board.getFleet()[4];
    board.placeShip(ship, [0, 0]);
    expect(ship.getPosition()).toEqual([
      [0, 0], 
      [0, 1],
    ])
  })

  it('Can place ships horizontally', () => {
    const ship = board.getFleet()[3];
    board.placeShip(ship, [7, 9], false);
    expect(ship.getPosition()).toEqual([
      [7, 9], 
      [8, 9],
      [9, 9]
    ])
  })

  it("Won't allow ships placed off board left", () => {
    const ship = board.getFleet()[4];
    expect(board.placeShip(ship, [-1, 4])).toBeFalsy();
  })

  it("Won't allow ships placed off board right", () => {
    const ship = board.getFleet()[3];
    expect(board.placeShip(ship, [8, 3], false)).toBeFalsy();
  })

  it("Won't allow ships placed off board high", () => {
    const ship = board.getFleet()[3];
    expect(board.placeShip(ship, [3, 8])).toBeFalsy();
  })

  it("Won't allow ships placed off board low", () => {
    const ship = board.getFleet()[4];
    expect(board.placeShip(ship, [4, -4])).toBeFalsy();
  })

  it("Won't allow ships to overlap", () => {
    const ship1 = board.getFleet()[0];
    const ship2 = board.getFleet()[3];
    board.placeShip(ship1, [3, 1]);
    expect(board.placeShip(ship2, [2, 3], false)).toBe(false)
  })

  describe('receiveAttack', () => {
    let ship1;
    let ship2;
    beforeEach(() => {
      ship1 = board.getFleet()[4];
      ship2 = board.getFleet()[0];
      board.placeShip(ship1, [2, 6]);
      board.placeShip(ship2, [4, 1], false);
    })

    it('Reports a hit to correct ship', () => {
      board.receiveAttack([2, 7])
      expect(ship1.getHits()).toEqual([[2, 7]])
    })

    it('Reports multiple hits', () => {
      board.receiveAttack([4, 1])
      board.receiveAttack([8, 1])
      expect(ship2.getHits()).toEqual([
        [4, 1],
        [8, 1]
      ])
    })

    it('Records a miss', () => {
      board.receiveAttack([5, 5])
      expect(board.getMisses()).toEqual([[5,5]])
    })
  })

  describe('isFleetSunk', () => {
    const Ship = require('../components/Ship')
    let ship1;
    let ship2;
    let mockFleet
    beforeEach(() => {
      ship1 = Ship(3);
      ship2 = Ship(3);
      mockFleet = [
        ship1, ship2
      ]
      board.placeShip(ship1, [0, 0])
      board.placeShip(ship2, [5, 6], false)
    })
    it('Returns true if fleet sunk', () => {
      ship1.recordHit([0, 0])
      ship1.recordHit([0, 1])
      ship1.recordHit([0, 2])
      ship2.recordHit([5, 6])
      ship2.recordHit([6, 6])
      ship2.recordHit([7, 6])

      expect(board.isFleetSunk(mockFleet)).toBe(true)
    })

    it('Returns false if fleet not sunk', () => {
      ship1.recordHit([0, 0])
      ship1.recordHit([0, 1])
      ship1.recordHit([0, 2])
      ship2.recordHit([5, 6])
      ship2.recordHit([6, 6])

      expect(board.isFleetSunk(mockFleet)).toBe(false)
    })
  })
})