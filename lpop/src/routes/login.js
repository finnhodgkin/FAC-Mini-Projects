module.exports = {
  method: 'GET',
  path: '/login',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    reply.view('login', null, { layout: 'admin' })
  },
}
