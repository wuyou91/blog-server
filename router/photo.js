const express = require('express')
const router = express.Router()
const photo = require('../controller/photo')

router.post('/uploadPhoto', photo.uploadPhoto)
router.get('/list',photo.list)

module.exports = router