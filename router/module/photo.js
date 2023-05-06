const express = require('express')
const router = express.Router()
const photo = require('../../controller/photo')
const checkAuth = require('../../middlewares/checkAuth')

router.post('/uploadPhoto', checkAuth, photo.uploadPhoto)
router.get('/list', photo.list)
router.post('/getHistoryPhoto', checkAuth, photo.getHistoryPhoto)
router.post('/changePhotoClassify', checkAuth, photo.changePhotoClassify)

module.exports = router