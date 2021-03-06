const Ship = require('./Ship');

const Gameboard = () => {
  let fleet = [];
  let fleetPoss = [];
  let misses = [];
  let hits = []
  let sunkShips = [];

  const getFleet = () => fleet
  const getMisses = () => misses
  const getFleetPoss = () => fleetPoss
  const getHits = () => hits  
  const getSunkShips = () => sunkShips

  const createFleet = () => {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const destroyer = Ship(3);
    const submarine = Ship(3);
    const patrol = Ship(2);
    fleet.push(carrier, battleship, destroyer, submarine, patrol)
    return fleet
  }

  const placeRandom = (ship) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const z = Math.floor(Math.random() * 10);
    const vert = z % 2 === 0 ? true : false;

    let position = layoutPos(ship, [x, y], vert);
    if (position !== false) {
      placeShip(ship, [x, y], vert)
    } else {
      placeRandom(ship)
    }
  }

  //auto place ships during development
  const initFleet = async () => {
    createFleet();
    await placeRandom(fleet[0], [1, 1]);
    await placeRandom(fleet[1], [2, 9]);
    await placeRandom(fleet[2], [4, 0]);
    await placeRandom(fleet[3], [7, 6]);
    await placeRandom(fleet[4], [3, 4]);
    return fleet;
  }

  const isValidPos = (pos) => {

    //ensures the position is on the board
    if ((pos[0] > 9)
    || (pos[1] > 9) 
    || (pos[0] < 0) 
    || (pos[1] < 0)) {
      return false;
    }

    //loops through other created ships to ensure the new ship doesn't overlap them
    for (let i = 0; i < fleetPoss.length; i++) {
      if ((fleetPoss[i][0] === pos[0]) 
      && (fleetPoss[i][1] === pos[1])) {
          return false
      }
    }
    return true;
  }

  const layoutPos = (ship, beg, vert) => {
    let x = beg[0];
    let y = beg[1];
    let position = []

    //sets starting position
    if (isValidPos(beg)) {
      position.push(beg)
    } else return false

    //increment the vertical or horizontal coordinate, check validity, and set the position
    for (let i = 1; i < ship.getLength(); i++) {
      if (vert === true) {
        y++; 
        if (isValidPos([x, y])) {
          position.push([x, y]);
        } else return false
      } else {
        x++;
        if (isValidPos([x, y])) {
          position.push([x, y])
        } else return false
      }
    }
    return position
  }

  const placeShip = (ship, beg, vert = true) => {
    let position = layoutPos(ship, beg, vert);
    if (position !== false) {
      position.forEach(pos => fleetPoss.push(pos))
      ship.setPosition(position);
    } else {
      return false
    }
  }

  const receiveAttack = (ary) => {
    let hit = false

    //get the positions of each ship, check for match against the attacked coordinate
    fleet.forEach(ship => {
      const poss = ship.getPosition();
      poss.forEach(pos => {
        if ((pos[0] === ary[0]) && pos[1] === ary[1]) {
          hit = true;
          ship.recordHit(ary);
          hits.push(ary)
          recordSunkShips();
        }
      })
    })
    if (hit === false) {
      misses.push(ary)
    }
  }

  //pass in fleet array
  const isFleetSunk = (ary) => {
    let sunkShips = []
    ary.forEach(ship => {
      if(ship.isSunk()) sunkShips.push(ship)
    })

    //true if number of sunk ships is equal to number of ships in the fleet
    return sunkShips.length === ary.length ? true : false
  }

  const recordSunkShips = () => {
    sunkShips = [];
    fleet.forEach(ship => {
      if (ship.isSunk()) {
        ship.getPosition().forEach(pos => {
          sunkShips.push(pos);
        })
      }
    })
  }

  const isFleetPlaced = () => {
    for (let i = 0; i < fleet.length; i++) {
      if (fleet[i].isPlaced() === false) return false
    }
    return true
  }

  const board = {
    createFleet, 
    getFleetPoss, 
    getFleet, 
    placeShip, 
    receiveAttack, 
    getMisses, 
    isFleetSunk, 
    initFleet, 
    getHits,
    getSunkShips,
    layoutPos,
    isFleetPlaced
  }

  return board
}

module.exports = Gameboard;