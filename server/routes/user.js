const router =require('express').Router()

const ctrls = require('../controllers/user')

router.post('/',ctrls.createUser)

module.exports =router