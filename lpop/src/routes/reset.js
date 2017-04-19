const lpop = require('./../lib/lpop');

module.exports = {
  method: 'PUT',
  path: '/reset',
  handler: (req, reply) => {
    lpop.reset((err, res) => {
      err ? console.log(err) : console.log(res)
      return err ? reply({error: 'Failed to reset'}) : reply({success: true})
    })
  },
}
