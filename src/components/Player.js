const Player = (title, turn) => {
  const prevTargets = [];
  let computer = false;

  const togComputer = () => {
    computer = !computer;
  }

  const getTurn = () => turn;

  const getComputer = () => computer;

  const getTitle = () => title

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
    return legal
  }

  const getTarget = () => {
    return [2, 2]
  }

  const playerAttack = (board, coord) => {
    const target = coord || getTarget();
    board.receiveAttack(target);
    prevTargets.push(target);
  } 

  const attack = (board, coord = []) => {
    return computer === true ? compAttack(board) : playerAttack(board, coord)
  }

  const compAttack = (board) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    board.receiveAttack([x, y]);
    prevTargets.push([x, y]);

  }

  return { attack, compAttack, togComputer, getComputer, getTurn, setTurn, isValidAttack, getTitle }
}

module.exports = Player;