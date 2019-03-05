const formidable = require('formidable')
const articleModel = require('../mongodb/models/article.js')

module.exports = {
  add (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      res.send(fields)
    })
  }
}