const fs = require('fs');
const path = require('path');

const readName = (cb) => {
  fs.readFile(path.join(__dirname, '..', 'name.json'), 'utf8', cb);
}

const lPopLive = (socket) => {
  readName((err, file) => {
    const name = JSON.parse(file).name;
    socket.emit('test', {n: name})
  })
  fs.watchFile(path.join(__dirname, '..', 'name.json'), () => {
    readName((err, file) => {
      const name = JSON.parse(file).name;
      socket.emit('test', {n: name});
    });
  });
}

module.exports = lPopLive;
