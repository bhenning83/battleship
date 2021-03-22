const Player = (turn) => {
  const prevTargets = [];
  let computer = false;

  const togComputer = () => {
    computer = !computer;
  }

  const getTurn = () => turn;

  const setTurn = (newTurn) => turn = newTurn;

  const isValidAttack = (target) => {
    let legal = true

    //search though previous prevTargets for current target
    for (let i = 0; i < prevTargets.length; i++) {
      if ((prevTargets[i][0] === target[0])
      && (prevTargets[i][1] === target[1])) {
        legal = false
      }
    }

    //ensures target is on the board
    if ((target[0] > 9)
    || (target[1] > 9) 
    || (target[0] < 0) 
    || (target[1] < 0)) {
      legal = false;
    }
    return legal === true ? prevTargets.push(target) : false
  }

  const getTarget = () => {
    return [2, 2]
  }

  const playerAttack = (board, coord) => {
    const target = coord || getTarget();
    if (isValidAttack(target)) {
      board.receiveAttack(target)
    } else {
      return 'Illegal attack'
    }
  } 

  const attack = (board, coord = []) => {
    return computer === true ? compAttack(board) : playerAttack(board, coord)
  }

  const compAttack = (board) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return isValidAttack([x, y]) ? board.receiveAttack(x, y) : 'Illegal attack'
  }

  return { attack, compAttack, togComputer, getTurn, setTurn }
}

module.exports = Player;