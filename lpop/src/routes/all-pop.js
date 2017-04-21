const { allPop } = require('./../database/get')

module.exports = {
  method: 'GET',
  path: '/all-pop',
  handler: (req, reply) => {
    allPop((err, res) => {
      return err ? reply().code(404) : reply({allUsers: res})
    })
  },
}
