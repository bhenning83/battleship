const Ship = require('../components/Ship');

describe('Ship', () => {
  let submarine

  beforeEach(() => {
    submarine = Ship(3);
    submarine.setPosition([
      [2,2],
      [2,3],
      [2,4]
    ])
    return submarine;
  });

  it('Sets position', () => {
    expect(submarine.getPosition()).toEqual([
      [2,2],
      [2,3],
      [2,4]
    ])
  })

  it('Returns length', () => {
    expect(submarine.getLength()).toBe(3)
  })

  it('Records hit', () => {
    submarine.recordHit([2, 2])
    expect(submarine.getHits()).toEqual([[2, 2]])
  })

  it('Records multiple hits', () => {
    submarine.recordHit([2, 2])
    submarine.recordHit([2, 3])
    expect(submarine.getHits()).toEqual([[2, 2], [2, 3]])
  })

  it('Returns false if not sunk', () => {
    submarine.recordHit([2, 2])
    submarine.recordHit([2, 3])
    expect(submarine.isSunk()).toBe(false)
  })

  it('Returns true if sunk', () => {
    submarine.recordHit([2, 2])
    submarine.recordHit([2, 3])
    submarine.recordHit([2, 4])
    expect(submarine.isSunk()).toBe(true)
  })

})