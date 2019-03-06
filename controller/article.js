const formidable = require('formidable')
const articleModel = require('../mongodb/models/article.js')

module.exports = {
  async add (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
					message: '表单信息错误'
        })
        return
      }
      if(!fields.html || fields.html === ''){
        res.send({
          status: 0,
					message: '请勿提交无内容的文章'
        })
        return
      }
      await articleModel.create({
        ...fields,
        create_time: new Date().toLocaleString()
      })
      res.send({
        status: 1,
        message: '文章提交成功'
      })
    })
  }
}