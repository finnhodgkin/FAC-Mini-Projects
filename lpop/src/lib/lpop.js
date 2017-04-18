const get = require('./../database/get');
const post = require('./../database/post');
const del = require('./../database/del');

const lpop = {}

lpop.pop = callback => {
  get.names((err, names) => {
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

lpop.reset = callback => post.reset(callback)

lpop.list = callback => get.names(callback)

lpop.add = (name, callback) => post.name(name, callback)

lpop.remove = (name, callback) => del.name(name, callback)

lpop.setCurrent = (name) => {
  post.tick(name, (err, res) => err ? console.log(err) : post.current(name))
}

lpop.getCurrent = callback => get.current(callback)

module.exports = lpop
