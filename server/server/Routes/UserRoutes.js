const { Register, Login,  SearchUser, ShowUsers } = require('../Apis/Users/UserController')

const router = require('express').Router()

router.post("/register",  Register)
router.post("/login", Login)
// router.post("/logout", Logout)

router.get("/show", ShowUsers)
router.post("/searchUser", SearchUser)


module.exports = router