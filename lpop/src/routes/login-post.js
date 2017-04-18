const bcrypt = require('bcrypt')
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

    req.cookieAuth.set({ username, test: 'testing' })

    auth(username, (err, user) => {
      if (err) return reply.view('index', { loginError: err.message })

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) return reply.view('index', { loginError: 'Error authenticating user' })
        if (!isAuthenticated) return reply.view('index', { loginError: 'Incorrect password' })

        console.log('GETS HERE', username, password)
        req.cookieAuth.set({ username, test: 'testing' })

        return reply.redirect('/admin')
      })
    })
  },
}
