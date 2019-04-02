const express = require('express')
const router = express.Router()
const article = require('../controller/article')
const checkLogin = require('../middlewares/checkLogin')

router.post('/addArticle', checkLogin, article.add)
router.get('/articleList',article.list)
router.get('/hotArticle',article.hot)
router.get('/deleteArticle', checkLogin, article.delete)
router.post('/updateArticle', checkLogin, article.update)
router.get('/star', article.star)
router.get('/:article_id', article.handleClick)


module.exports = router