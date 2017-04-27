const { allPop } = require('./../database/post')

module.exports = {
  method: 'PUT',
  path: '/all-pop/{allPop}',
  handler: (req, reply) => {
    allPop(req.params.allPop, (err) => {
      err ? console.log(err) : ''
      return err ? reply({error: 'Something went wrong'}) : reply({success: req.params.allPop})
    })
  },
}
