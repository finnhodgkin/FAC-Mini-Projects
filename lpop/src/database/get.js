connect = require('./connect')

const get = {}

get.names = (callback) => {
  connect.query(`SELECT name FROM lpop;`, (err, { rows: names }) => {
    if (err) callback(err)
    // Get simple array of name strings
    callback(null, names.map(n => n.name))
  })
}

module.exports = get
