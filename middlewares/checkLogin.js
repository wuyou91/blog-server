module.exports = function(req, res, next){
  if (!req.session.admin_id) {
    return res.send({
      status: 49,
      message: '你还未登陆，或登陆已过期'
    })
  }else{
    next()
  }
}