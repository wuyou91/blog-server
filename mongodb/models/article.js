const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: String,
  create_date: {type: Date, default: Date.now},
  date_string: String,
  title: String,
  desc: String,
  clicks: Number,
  stars: Number,
  cover: {type:String, default: 'default_cover.jpg'},
  classify: String,
  deleted:{type:Boolean, default: false},
  html: String
})

articleSchema.index({id:1})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article