const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: String,
  useNum: {type: Number, default: 1}
})

tagSchema.index({id:1})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag