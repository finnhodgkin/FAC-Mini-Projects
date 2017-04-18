connect = require('./connect')

module.exports = (username, callback) => {
  connect.query(`
    SELECT username, password FROM auth
    WHERE username = $1;`, [username], (err, { rows: user }) => {
    if (err) callback(err)
    // Get simple array of name strings
    callback(null, user[0])
  })
}
