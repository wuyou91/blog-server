const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  id: Number,
  name: String,
  password: String,
  create_time: Date,
  avatar: {type:String, default: 'default.jpg'}
})

adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
