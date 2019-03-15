const visitorModel = require('../mongodb/models/visitor.js')
const util = require('../util')

module.exports = async (req, res, next) => {
  let ip = req.ip
  try {
    let hasVisitor = await visitorModel.findOne({ip})
    if(hasVisitor){
      hasVisitor.visit_count++
      hasVisitor.last_time = new Date().toLocaleString()
      await hasVisitor.save()
    }else{
      const visitor_id = await util.getId('visitor_id')
      const time = new Date().toLocaleString()
      await visitorModel.create({
        id: visitor_id,
        ip: ip,
        first_time: time,
        last_time: time,
        visit_count: 1
      })
    }
  } catch (error) {
    console.log('错误是'+ error)
  }
  next()
} 