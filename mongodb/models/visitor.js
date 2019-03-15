const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitorSchema = new Schema({
  id: String,
  ip: String,
  first_time: String,
  last_time: String,
  visit_count: Number
})

visitorSchema.index({id:1})

const Visitor = mongoose.model('Visitor', visitorSchema)

module.exports = Visitor