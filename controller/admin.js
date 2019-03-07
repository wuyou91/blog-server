const formidable = require('formidable')
const config = require('../config')

module.exports = {
  login (req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, function(err,fields,files){
      if(fields.name === config.admin_name && fields.password === config.admin_password){
        req.session.admin_id = '1991';
        res.send({
          status: 1,
          success: '登录成功'
        })
      }else{
        res.send({
          status: 0,
          message: '用户名或密码错误'
        })
      }
    })
  }
}