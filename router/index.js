const admin = require('./admin')
const article = require('./article')
const checkLogin = require('../middlewares/checkLogin')

module.exports = app => {
  app.use('/admin', admin)
  app.use('/article', checkLogin, article)
}