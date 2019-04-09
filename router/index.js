const admin = require('./admin')
const article = require('./article')
const photo = require('./photo')

module.exports = app => {
  app.use('/admin', admin)
  app.use('/article', article)
  app.use('/photo',photo)
}