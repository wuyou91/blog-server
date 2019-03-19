const express = require('express')
const router = express.Router()
const article = require('../controller/article')
const checkLogin = require('../middlewares/checkLogin')

router.post('/addArticle',article.add)
router.get('/articleList',article.list)
router.get('/deleteArticle',article.delete)
router.post('/updateArticle',article.update)
router.get('/star', article.star)
router.get('/:article_id', article.handleClick)


module.exports = router