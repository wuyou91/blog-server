const express = require('express')
const router = require('./router')
const chalk = require('chalk')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const config = require('./config')
const visitorCount = require('./middlewares/visitorCount')

require('./mongodb/db.js')

const app = express()

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	// if (req.method == 'OPTIONS') {
  // 	res.sendStatus(200);
	// } else {
  //   next();
  // }
  next()
});

app.all('/', visitorCount)

const SessionStore = connectMongo(session)
app.use(session({
  name:config.session.name,
  secret:config.session.secret,
  resave: true,
	saveUninitialized: false,
  cookie:config.session.cookie,
  store: new SessionStore({
    url: config.db_base
  })
})
)
router(app);

app.use(express.static(__dirname + '/public'))
app.listen(config.port, config.host, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});