module.exports = function(req, res, next){
  if(!req.session.admin_id){
    res.status(403).send('你还未登陆，或登陆已过期');
    return
  }else{
    next()
  }
}