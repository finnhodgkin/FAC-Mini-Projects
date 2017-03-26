const http = require('http');
const port = process.env.PORT || 4000;
const router = require('./router');
const watchLPop = require('./watchLPop');
const server = http.createServer(router);

const io = require('socket.io')(server);

server.listen(port, () => {
  console.log('server is listening on port: ', port);
});

io.on('connection', watchLPop);
