const express = require('express')
const controller = require('../controllers/Memory-controllers')
const checkAuthToken = require("../middleware/checkAuthToken")
const router = express.Router()

router.post('/add-memory', checkAuthToken, controller.addMemory)

router.get('/memories', controller.getMemories)

router.put('/update-memory', controller.updateMemory)

router.delete('/delete-memory', controller.deleteMemory)

module.exports = router


