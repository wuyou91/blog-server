const express = require('express')
const router = express.Router()

const admin = require('../controller/admin.js')

router.post('/login',admin.login)

module.exports = router

