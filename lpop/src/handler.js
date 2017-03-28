const fs = require('fs');
const path = require('path');
const url = require('url');
const lpop = require('./../lpop');

const handler = {};

handler.serveLanding = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(file);
  });
}

const sockets = [];

handler.socket = (socket) => {
  fs.readFile(path.join(__dirname, '..', 'name.json'), 'utf8', (err, file) => {
    const name = JSON.parse(file).name;
    socket.emit('test', {n: name});
  });
  sockets.push(socket);
}

handler.lpop = (req, res) => {
  lpop.getName((err, name) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    sockets.forEach(e => {
      e.emit('test', { n:name });
    });
    res.end(name);
  });
}

handler.lpopAdd = (req, res) => {
  apply(req, res, lpop.add);

}

handler.lpopRemove = (req, res) => {
  apply(req, res, lpop.remove);

}

function apply(req, res, func) {
  const query = url.parse(req.url, true).query;
  if (query.q) {
    const name = query.q.replace(/[^a-z]/gi, '');
    func(name, (err, message) => {
      if (err) {
        handler.serveError(req, res, err);
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
    });
  } else {
    handler.serveError(req, res, new Error('Invalid query'));
  }
}

handler.serveError = (req, res, err) => {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end(err || '404: page not found')
}

module.exports = handler;
