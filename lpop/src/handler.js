const fs = require('fs');
const path = require('path');
const lpop = require('./../lpop');

const handler = {};

handler.serveLanding = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(file);
  });
}

handler.lpop = (req, res) => {
  lpop((err, name) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(name);
  });
}

handler.serveError = (req, res, err) => {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end(err || '404: page not found')
}

module.exports = handler;
