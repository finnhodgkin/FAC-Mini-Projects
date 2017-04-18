module.exports = {
  method: 'GET',
  path: '/admin',
  handler: (req, reply) => {
    reply.view('admin', null, { layout: 'admin' })
  },
}
