const express = require('express')
const router = express.Router()

const article = require('../controller/article')

router.post('/addArticle',article.add)
router.get('/deleteArticle',article.delete)


module.exports = router