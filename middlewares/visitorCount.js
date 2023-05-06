const visitorModel = require('../mongodb/models/visitor.js')
const util = require('../util')

module.exports = async (req, res, next) => {
  const ip = req.ip
  const headers = req.headers
  try {
    let hasVisitor = await visitorModel.findOne({ ip })
    if(hasVisitor){
      hasVisitor.visit_count++
      hasVisitor.last_time = util.formatDateTime()
      hasVisitor.last_header = headers
      await hasVisitor.save()
    }else{
      const visitor_id = await util.getId('visitor_id')
      const time = util.formatDateTime()
      await visitorModel.create({
        id: visitor_id,
        ip: ip,
        first_time: time,
        last_time: time,
        visit_count: 1,
        first_header: headers,
        last_header: headers
      })
    }
  } catch (error) {
    console.log('错误是'+ error)
  }
  next()
} 