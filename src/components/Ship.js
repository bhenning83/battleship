const Ship = (length) => {
  let hits = [];
  let position = [];
  let placed = false;

  const setPosition = (ary) => {
    position = ary;
    placed = true;
  } 

  const getPosition = () => position

  const recordHit = (ary) => {
    hits.push(ary)
  }

  const getHits = () => hits;
  
  const isPlaced = () => placed

  const getLength = () => length;

  const isSunk = () => {
    return (hits.length === length) ? true : false
  }

  return { setPosition, getPosition, getLength, recordHit, getHits, isSunk, isPlaced }
}

module.exports = Ship;