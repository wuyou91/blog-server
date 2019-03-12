module.exports = {
  host:'10.10.60.65',
  port: 1003,
  db_base:'mongodb://localhost:27017/blog',
  session: {
    name: 'sid',
    secret: 'sid',
    cookie:{
        httpOnly: true,
        secure:   false,
        maxAge:   24 * 60 * 60 * 1000 // 1天
    }
  }
}