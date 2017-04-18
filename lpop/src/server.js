// Create hapi server
const hapi = require('hapi')
const server = new hapi.Server()

// Private server config variables
require('env2')('config.env')

// Hapi plugins
const inert = require('inert')
const vision = require('vision')
const cookieAuthModule = require('hapi-auth-cookie')
const contextCredentials = require('hapi-context-credentials')

// Route and view setup
const routes = require('./routes')
const handlebars = require('./handlebars')

server.connection({
  port: process.env.PORT || 4000,
})

server.register([inert, vision, cookieAuthModule, contextCredentials], err => {
  if (err) throw err

  server.auth.strategy('base', 'cookie', 'required', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'mmedium-cookie',
    isSecure: process.env.NODE_ENV !== 'dev',
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/',
    redirectOnTry: false,
    isSameSite: false,
  })

  server.views(handlebars)
  server.route(routes)
})

module.exports = server;
