const mongoose = require('mongoose')
const Schema = mongoose.Schema

const idsSchema = new Schema({
  article_id: Number,
  admin_id: Number,
  visitor_id: Number,
  photo_id: Number
})

const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
  if(!data){
    Ids.create({
      article_id: 0,
      admin_id: 0,
      visitor_id: 0,
      photo_id: 0
    })
  }
})

module.exports = Ids