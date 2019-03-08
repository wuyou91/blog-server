const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: String,
  create_time: Date,
  title: String,
  desc: String,
  tags: Array,
  html: String,
})

articleSchema.index({id:1})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article