const lpop = require('../lib/lpop')

module.exports = (listener) => {

  const io = require('socket.io').listen(listener)

  io.on('connection', (socket) => {
    const render = (err, name) => err ? console.log(err) : io.emit('name', {n: name.name || name, id: name.id || null})

    socket.emit('name', { n: lpop.getCurrent(render) })
    socket.on('requestName', (msg) => {
      lpop.pop(render)
    })
  })

}
