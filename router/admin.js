const express = require('express')
const router = express.Router()

const admin = require('../controller/admin.js')

router.post('/login',admin.login)
router.post('/register', admin.register)
router.get('/getInfo', admin.getInfo)

module.exports = router

