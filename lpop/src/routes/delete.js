const lpop = require('./../lib/lpop');

module.exports = {
  method: 'DELETE',
  path: '/delete/{id}',
  handler: (req, reply) => {
    console.log('happening', req.params.id);
    lpop.remove(req.params.id, (err, msg) => {
      console.log(err, msg)
      return err ? reply({success: false}) : reply({success: true})
    })
  },
}
