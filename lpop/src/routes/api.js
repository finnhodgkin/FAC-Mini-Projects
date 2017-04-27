// const lpop = require('./../lib/lpop')
const { allPop, getCurrent, getNames } = require('../database/get')
const { deleteName } = require('../database/del')
const parallel = require('../lib/parallel')

module.exports = {
  method: ['POST', 'DELETE', 'GET', 'PUT'],
  path: '/api',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {

    const params = Object.keys(req.query)
      .reduce((acc, item) => {
        acc[item] = req.query[item]
        return acc
      }, {})

    const taskList = []
    if (params.hasOwnProperty('getnames')) {
      taskList.push(getNames)
    }
    if (params.hasOwnProperty('isallpop')) {
      taskList.push(allPop)
    }
    if (params.hasOwnProperty('getcurrent')) {
      taskList.push(getCurrent)
    }

    if (taskList.length) {
      parallel(taskList, (err, res) => {
        err ?
        reply({error: 'Error connecting to database.'}) :
        reply(res.reduce((acc, item) => {
          acc[Object.keys(item)[0]] = item[Object.keys(item)[0]]
          return acc
        }, {}))
      })

    } else {
      reply({error: 'Incorrect query.'})
    }

  },
}
