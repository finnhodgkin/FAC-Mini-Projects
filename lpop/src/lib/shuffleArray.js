/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
module.exports = function shuffleArray(arr) {
  const array = Array.from(arr);
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
