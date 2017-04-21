const lpop = require('./../lib/lpop');

module.exports = {
  method: 'GET',
  path: '/names',
  config: {
    auth: { mode: 'optional' },
  },
  handler: (req, reply) => {
    lpop.list((err, list) => {
      err ? reply({ error: 'SORRY' }) : reply({ names: list })
    })
  },
}
