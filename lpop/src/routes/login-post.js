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

    console.log('SETTING COOKIE');
    req.cookieAuth.set({ username });

    return reply.view('index');


    // auth(username, (err, user) => {
    //   if (err) return reply.view('index', { loginError: err.message })
    //
    //   bcrypt.compare(password, user.password, (err, isAuthenticated) => {
    //     if (err) return reply.view('index', { loginError: 'Error authenticating user' })
    //     if (!isAuthenticated) return reply.view('index', { loginError: 'Incorrect password' })
    //
    //     console.log('GETS HERE', username)
    //     req.cookieAuth.set({ username })
    //
    //     return reply.redirect('/admin')
    //   })
    // })
  },
}
