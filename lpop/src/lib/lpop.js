const {getNames, getCurrent} = require('./../database/get');
const {reset, addName, tick, setCurrent} = require('./../database/post');
const {deleteName} = require('./../database/del');

const lpop = {}

lpop.pop = callback => {
  getNames((err, {names}) => {
    if (err) return callback(new Error('Error connecting to database'))

    // Only use names that haven't been selected
    const unselected = names.filter(name => !name.selected)
    // Pick a random unselected name or set null if all names are selected
    const name = unselected[0] ?
      unselected[Math.floor(Math.random() * unselected.length)] :
      null

    if (name) {
      callback(null, name)
      lpop.setCurrent(name.name)
    } else {
      // If no unselected names then reset all to unselected and rerun pop
      lpop.reset((err) => err ? callback(err) : lpop.pop(callback))
    }
  })
}

lpop.reset = callback => reset(callback)

lpop.list = callback => getNames(callback)

lpop.add = (nameToAdd, callback) => addName(nameToAdd, callback)

lpop.remove = (name, callback) => deleteName(name, callback)

lpop.setCurrent = (name) => {
  tick(name, (err, res) => err ? console.log(err) : setCurrent(name))
}

lpop.getCurrent = callback => getCurrent(callback)

module.exports = lpop
