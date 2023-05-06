const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../../util')

const photoSchema = new Schema({
  id: String,
  upload_date: String,
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