const mongoose = require('mongoose')
const Schema = mongoose.Schema

const idsSchema = new Schema({
  article_id: Number,
  admin_id: Number
})

const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
  if(!data){
    newIds = new Ids({
      article_id: 0,
      admin_id: 0
    })
    newIds.save()
  }
})

module.exports = Ids