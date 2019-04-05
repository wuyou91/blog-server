module.exports = {
  host:'localhost',
  port: 7003,
  db_base:'mongodb://localhost:27017/blog',
  session: {
    name: 'sid',
    secret: 'sid',
    cookie:{
        domain:'admin.yancx.cn',
        httpOnly: true,
        secure:   false,
        maxAge:   1000 * 60 * 60 * 24 * 365 // 1年
    }
  }
}