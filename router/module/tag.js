const express = require('express')
const router = express.Router()
const tag = require('../../controller/tag')

router.get('/tagList', tag.list)
router.get('/hotTag', tag.hotTag)
    
module.exports = router