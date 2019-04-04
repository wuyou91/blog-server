const express = require('express')
const router = express.Router()
const admin = require('../controller/admin.js')
const checkLogin = require('../middlewares/checkLogin')


router.post('/login',admin.login)
router.get('/singout', admin.singout)
router.post('/register', admin.register)
router.get('/getInfo', admin.getInfo)
router.get('/list', checkLogin, admin.getList)
router.get('/visitor',checkLogin, admin.visitor)
router.get('/visitorCount', admin.visitorCount)
router.get('/blogInfo', checkLogin, admin.blogInfo)

module.exports = router

