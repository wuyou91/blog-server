const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: Number,
  create_time: String,
  title: String,
  desc: String,
  tags: Array,
  html: String,
})

articleSchema.index({id:1})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article