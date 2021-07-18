const express = require('express')
const controller = require('../controllers/user-controller')
const checkAuthToken = require("../middleware/checkAuthToken")
const router = express.Router()

router.post('/create-user', controller.signUpUser)

router.post('/user-login', controller.loginUser)

router.post('/user-logout', checkAuthToken, controller.logoutUser)

router.get('/get-user', controller.getUser)

router.put('/update-user')

router.delete('/delete-user', controller.deleteUser )

module.exports = router
