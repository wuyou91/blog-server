const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)
mongoose.set('useFindAndModify', false)
mongoose.connect(config.db_base, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => console.log('数据库链接成功'))

db.on('error', (err) => {
  console.log(`数据库运行错误，错误信息：${err}`)
  mongoose.disconnect()
})

db.on('close', () => {
  console.log('数据库断开链接，即将重新连接数据库')
  mongoose.connect(config.db_base)
})

module.exports = db