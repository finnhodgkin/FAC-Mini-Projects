connect = require('./connect')

const get = {}

get.getNames = (callback) => {
  connect.query(`SELECT name, selected, id FROM lpop;`, (err, { rows: names }) => {

    err ? callback(err) :
    // Error handle no results
    !names.length ? callback(new Error('No results')) :
    // Give callback an array of name strings
    callback(null, names.map( n => ({name: n.name, selected: n.selected, id: n.id}) ))
  })
}

get.getCurrent = (callback) => {
  connect.query(`SELECT name FROM current;`, (err, res) => {
    // Get current name
    err ? callback(err) : callback(null, res.rows[0].name)
  })
}

module.exports = get
