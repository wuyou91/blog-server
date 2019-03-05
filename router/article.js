const express = require('express')
const router = express.Router()

const article = require('../controller/article')

router.post('/addArticle',article.add)

module.exports = router