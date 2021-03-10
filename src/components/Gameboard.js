const Ship = require('./Ship')

const Gameboard = () => {
  let ships = []

  const getShips = () => {return ships}

  const createShips = () => {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const destroyer = Ship(3);
    const submarine = Ship(3);
    const patrol = Ship(2);
    ships.push(carrier, battleship, destroyer, submarine, patrol)
  }

  const placeShip = (ship, beg, vert) => {
    let x = beg[0];
    let y = beg[1];
    let positions = {}
    positions[0] = beg;
    for (let i = 1; i < ship.getLength(); i++) {
      if (vert === true) {
        y++;
        positions[i] = [x, y];
      } else {
        x++;
        positions[i] = [x, y];
      }
    }
    ship.setPosition(positions);
  }

  const checkValidPos = (obj) = {

  }

  return { createShips, getShips, placeShip }
}

module.exports = Gameboard