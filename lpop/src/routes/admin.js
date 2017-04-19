const lpop = require('./../lib/lpop');

module.exports = {
  method: 'GET',
  path: '/admin',
  handler: (req, reply) => {
    lpop.list((err, list) => {
      reply.view('admin', { names: list }, { layout: 'admin' })
    })
  },
}
