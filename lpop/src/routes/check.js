const {toggleTickById} = require('./../database/post');

module.exports = {
  method: 'PUT',
  path: '/check/{id}/{isOn}',
  handler: (req, reply) => {
    toggleTickById(req.params.id, req.params.isOn, (err, msg) => {
      err ? console.log(err) : console.log(msg)
      return err ? reply({error: 'Failed to remove user'}) : reply({success: true})
    })
  },
}
