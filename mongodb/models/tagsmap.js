const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagsMapSchema = new Schema({
  tid: Number,
  aid: Number
})

tagsMapSchema.index({tid:1})

const tagsMap = mongoose.model('tagsMap', tagsMapSchema)

module.exports = tagsMap