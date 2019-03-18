const express = require('express')
const router = express.Router()

const article = require('../controller/article')

router.post('/addArticle',article.add)
router.get('/articleList',article.list)
router.get('/deleteArticle',article.delete)
router.post('/updateArticle',article.update)
router.get('/:article_id', article.get)


module.exports = router