const admin = require('./admin')
const article = require('./article')

module.exports = app => {
  app.use('/admin', admin)
  app.use('/article', article)
}