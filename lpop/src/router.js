const handler = require('./handler.js');
const _url = require('url');

const router = (req, res) => {
  const pathname = _url.parse(req.url).pathname;

  const api = {
    '/lpop' : handler.lpop,
    '/add' : handler.lpopAdd,
    '/remove' : handler.lpopRemove
  }[pathname];

  // ROUTES:
  if (pathname === '/') {
    handler.serveLanding(req, res);

  } else if (api) {
    api(req, res);

  } else {
    handler.serveError(req, res);

  }
};

module.exports = router;
