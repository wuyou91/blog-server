const express = require('express')
const router = express.Router()

const admin = require('./module/admin')
const article = require('./module/article')
const photo = require('./module/photo')
const tag = require('./module/tag')

router.use('/admin', admin)
router.use('/article', article)
router.use('/photo', photo)
router.use('/tag', tag)

module.exports = router