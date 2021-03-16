const Ship = (length) => {
  let hits = [];
  let position = [];

  const setPosition = (ary) => position = ary;

  const getPosition = () => position

  const recordHit = (ary) => {
    hits.push(ary)
  }

  const getHits = () => hits;
  

  const getLength = () => length;

  const isSunk = () => {
    return (hits.length === length) ? true : false
  }

  return { setPosition, getPosition, getLength, recordHit, getHits, isSunk }
}

module.exports = Ship;