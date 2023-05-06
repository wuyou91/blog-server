const express = require('express')
const router = express.Router()
const article = require('../../controller/article')
const checkLogin = require('../../middlewares/checkLogin')
const checkAuth = require('../../middlewares/checkAuth')

router.post('/addArticle', checkLogin, checkAuth, article.add)
router.get('/articleList', article.list)
router.get('/hotArticle',article.hot)
router.get('/deleteArticle', checkLogin, checkAuth, article.delete)
router.get('/recoveryArticle', checkLogin, checkAuth, article.recovery)
router.post('/updateArticle', checkLogin, checkAuth, article.update)
router.get('/star', article.star)
router.get('/:article_id', article.handleClick)


module.exports = router