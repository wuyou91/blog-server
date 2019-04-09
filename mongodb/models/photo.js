const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema({
  upload_date: {type: Date, default: Date.now},
  name: String,
  hash: String,
  size: String,
  bucket: String,
  width: String,
  height: String,
  type: String,
  classify: {type: String, default: '其他'},
  deleted: {type:Boolean, default: false}
})

photoSchema.index({hash:1})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo