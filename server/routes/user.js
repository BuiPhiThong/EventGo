const router =require('express').Router()
const {verifyToken,isAdmin} = require('../middlewares/verify')
const ctrls = require('../controllers/user')

router.post('/',ctrls.createUser)
router.post('/login',ctrls.login)
router.get('/getcurrent',[verifyToken],ctrls.getCurrent)
router.post('/regisevent',[verifyToken],ctrls.eventRegistration)
router.put('/cancelevent',[verifyToken],ctrls.cancellEvent)

module.exports =router