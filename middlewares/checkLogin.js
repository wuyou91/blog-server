module.exports = function(req, res, next){
  if(!req.session.admin_id){
    res.send({
      status: 0,
      message: '还未登录'
    })
    return
  }else{
    next()
  }
}