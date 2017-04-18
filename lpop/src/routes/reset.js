const lpop = require('./../lib/lpop');

module.exports = {
  method: 'PUT',
  path: '/reset',
  handler: (req, reply) => {
    lpop.reset((err, res) => {
      console.log(err, res)
      return err ? reply({error: 'Failed to reset'}) : reply({success: true})
    })
  },
}
