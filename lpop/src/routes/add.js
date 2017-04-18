const lpop = require('./../lib/lpop');

module.exports = {
  method: 'POST',
  path: '/add/{name}',
  handler: (req, reply) => {
    console.log('happening', req.params.name);
    lpop.add(req.params.name, (err, res) => {
      console.log(err, res)
      return err ? reply({error: 'Failed to add user'}) : reply({id: res})
    })
  },
}
