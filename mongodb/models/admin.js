const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
  create_time: String,
  last_login_time: String,
  grade: {type:Number, default: 1},
  desc: {type:String, default: '普通管理员'},
  avatar: {type:String, default: 'image/default_avatar.jpg'}
})

adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
