module.exports = {
    session: {
      name: 'sid',
      secret: 'sid',
      cookie:{
          httpOnly: true,
          secure:   false,
          maxAge:   1000 * 60 * 60 * 24 * 365 // 1年
      }
    }
  }