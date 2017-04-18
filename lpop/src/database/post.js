connect = require('./connect')

const post = {}

post.name = (name, callback) => {
  connect.query(`INSERT INTO lpop (name) VALUES ($1) RETURNING id;`, [name], (err, res) => {
    // Add a name to the database
    err ? callback(err) : callback(null, res.rows[0].id)
  })
}

post.current = (name) => {
  connect.query(`UPDATE current SET name = $1 WHERE id = 1`, [name], (err) => {
    // Put the most recently popped name in the database
    err ? console.log(err) : ''
  })
}

post.tick = (name, callback) => {
  connect.query(`UPDATE lpop SET selected = true WHERE name = $1;`, [name], (err) => {
    err ? callback(err) : callback(null, 'Checked off that name!')
  })
}

post.reset = (callback) => {
  connect.query(`UPDATE lpop SET selected = false;`, (err) => {
    err ? callback(err) : callback(null, 'Reset all names')
  })
}

module.exports = post
