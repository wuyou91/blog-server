const express = require('express')
const router = express.Router()
const admin = require('../controller/admin.js')
const checkLogin = require('../middlewares/checkLogin')


router.post('/login',admin.login)
router.post('/register', admin.register)
router.get('/getInfo', admin.getInfo)
router.get('/list', admin.getList)
router.get('/visitor', admin.visitor)

module.exports = router

