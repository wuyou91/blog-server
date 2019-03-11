const formidable = require('formidable')
const config = require('../config')
const adminModel = require('../mongodb/models/admin.js')

module.exports = {
  login (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, function(err,fields,files){
      if(fields.name === config.admin_name && fields.password === config.admin_password){
        req.session.admin_id = '2019';
        res.send({
          status: 1,
          message: '登录成功'
        })
      }else{
        res.send({
          status: 0,
          message: '用户名或密码错误'
        })
      }
    })
  },
  getAdminInfo (req, res) {
    admin_id = req.session.admin_id
  }
}