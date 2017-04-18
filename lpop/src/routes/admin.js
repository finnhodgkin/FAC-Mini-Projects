module.exports = {
  method: 'GET',
  path: '/admin',
  config: {
    auth: {
      mode: 'try',
    },
  },
  handler: (req, reply) => {
    reply.view('admin', null, { layout: 'admin' })
  },
}
