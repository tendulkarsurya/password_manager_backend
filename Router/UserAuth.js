const UserAuthController = require('../Controller/UserAuthController')

const router = require('express').Router()

router.post("/usercreate",UserAuthController.createuser)
router.post("/userlogin",UserAuthController.userlogin)
router.post("/userrequsetotp",UserAuthController.requsetotp)
router.put("/userresetpassword",UserAuthController.otpverify)



module.exports = router