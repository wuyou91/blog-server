const mongoose = require('mongoose')
const Schema = mongoose.Schema
const util = require('../../util')

const articleSchema = new Schema({
  id: String,
  create_date: String,
  title: String,
  desc: String,
  clicks: Number,
  stars: Number,
  cover: {type:String, default: 'image/default_cover.jpg'},
  classify: String,
  deleted:{type:Boolean, default: false},
  html: String,
  tags: { type: Array, default: [] }
})

articleSchema.index({id:1})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article