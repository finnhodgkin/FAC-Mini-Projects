connect = require('./connect')

const del = {}

del.name = (id, callback) => {
  connect.query(`DELETE FROM lpop
    WHERE id = (SELECT id FROM lpop WHERE id = $1
    LIMIT 1);`, [id], (err) => {
    // Remove a name from the database
    err ? callback(err) : callback(null, `Removed user #${id}`)
  })
}

module.exports = del
