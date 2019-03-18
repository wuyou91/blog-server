const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagsSchema = new Schema({
  id: String,
  name: String,
  count: Number,
})

tagsSchema.index({id:1})

const Tags = mongoose.model('Tags', tagsSchema)

module.exports = Tags