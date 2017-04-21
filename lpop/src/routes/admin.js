const lpop = require('./../lib/lpop');

module.exports = {
  method: 'GET',
  path: '/admin',
  handler: (req, reply) => {
    reply.file('./build/index.html')
  },
}
