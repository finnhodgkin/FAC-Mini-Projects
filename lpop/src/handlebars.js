const handlebars = require('handlebars');

module.exports = {
  engines: {
    hbs: handlebars,
  },
  relativeTo: __dirname + '/views/',
  path: './',
  layout: 'user',
  layoutPath: 'layouts',
  partialsPath: 'partials',
  helpersPath: 'helpers',
}
