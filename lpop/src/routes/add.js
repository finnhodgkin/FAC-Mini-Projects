const lpop = require('./../lib/lpop');

module.exports = {
  method: 'POST',
  path: '/add/{name}',
  handler: (req, reply) => {
    lpop.add(req.params.name, (err, res) => {
      err ? console.log(err) : console.log(`${req.params.name} added with id ${res}`);
      return err ? reply({error: 'Failed to add user'}) : reply({id: res})
    })
  },
}
