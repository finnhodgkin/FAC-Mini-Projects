const lpop = require('./../lib/lpop');

module.exports = {
  method: 'DELETE',
  path: '/delete/{id}',
  handler: (req, reply) => {
    lpop.remove(req.params.id, (err, msg) => {
      err ? console.log(err) : console.log(msg)
      return err ? reply({error: 'Failed to remove user'}) : reply({success: true})
    })
  },
}
