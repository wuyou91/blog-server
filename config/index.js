module.exports = {
  port: 1003,
  admin_name: 'test',
  admin_password: '123456',
  db_base:'mongodb://localhost:27017/blog',
  session: {
    name: 'sid',
    secret: 'sid',
    cookie:{
        httpOnly: true,
        secure:   false,
        maxAge:   365 * 24 * 60 * 60 * 1000 // 1年
    }
  }
}