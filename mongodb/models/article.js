const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: String,
  create_date: Date,
  date_string: String,
  title: String,
  desc: String,
  clicks: {type:Number, default:32},
  cover: {type:String, default: 'default_cover.jpg'},
  tags: [],
  html: String,
})

articleSchema.index({id:1})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article