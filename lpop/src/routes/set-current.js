const {setCurrent} = require('./../database/post');

module.exports = {
  method: 'PUT',
  path: '/set/{name}',
  handler: (req, reply) => {
    setCurrent(req.params.name)
    reply({success: true})
  },
}
