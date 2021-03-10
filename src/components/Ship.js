const Ship = (length) => {
  let hits = {};
  let position = {};

  const setPosition = (obj) => position = obj;

  const getPosition = () => position

  const recordHit = (ary) => {
    let key = Object.keys(position).filter(key => {
      return JSON.stringify(position[key]) === JSON.stringify(ary)
    });

    hits[key] = ary;
  }

  const getHits = () => hits;
  

  const getLength = () => length;

  const isSunk = () => {
    return JSON.stringify(hits) === JSON.stringify(position) ? true : false
  }

  return { setPosition, getPosition, getLength, recordHit, getHits, isSunk }
}

module.exports = Ship;