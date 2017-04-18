const get = require('../database/get');

module.exports = (listener) => {

  const io = require('socket.io').listen(listener)

  io.on('connection', (socket) => {
    socket.emit('io:welcome', 'hi!')

    socket.on('requestName', (msg) => {
      get.names((err, names) => {
        if (err) return console.log(err)

        io.emit('name', {n: names[Math.floor(Math.random() * names.length)]})
      })
    })
  })

}
