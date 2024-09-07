const router = require('express').Router()
const UserloginController = require('../Controller/UserData1')


router.get("/loginpage",UserloginController.getdata)
router.post("/loginpage",UserloginController.postuserdata)



module.exports = router
