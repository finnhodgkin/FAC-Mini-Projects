const lpop = require('../lib/lpop')
const {tickById} = require('../database/post');
const {allPop} = require('../database/get');

module.exports = (listener) => {

  const io = require('socket.io').listen(listener)

  io.on('connection', (socket) => {
    const render = (err, name) => err ? console.log(err) : io.emit('allName', {n: name.name || name, id: name.id || null})
    const callAllPop = () => allPop((err, res) => err ? console.log(err) :
      res.allUsers ? io.emit('allPop', {on: true}) : io.emit('allPop', {on: false}))

    lpop.getCurrent((err, { currentName }) => socket.emit('name', { n: currentName }))
    callAllPop();

    // React client stuff
    socket.on('name', (data) => {
      io.emit('name', data)
      if (data.id) tickById(data.id, (err) => {
        if (err) socket.emit('error', {error: 'Error ticking name in database'})
      })
    })

    socket.on('update', () => io.emit('update'))

    socket.on('allPop', () => callAllPop())

    socket.on('reset', () => {
      io.emit('reset')
      lpop.reset(() => {})
    })

    socket.on('requestName', (msg) => {
      allPop((err, res) => {
        err ? console.log(err) :
          res ? lpop.pop(render) : ''
      })
    })
  })

}
