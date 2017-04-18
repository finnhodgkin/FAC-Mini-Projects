const auth = require('./../database/auth')
const joi = require('joi')

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    auth(username, password, err => {
      if (err) return reply.view('login', { loginError: err.message })

      // Set the cookie when auth is successful
      req.cookieAuth.set({ username })
      return reply.redirect('/admin')
    })
  },
}
