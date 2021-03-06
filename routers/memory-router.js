const express = require('express')
const controller = require('../controllers/memory-controllers')
const checkAuthToken = require("../middleware/checkAuthToken")
const router = express.Router()

router.post('/add-memory', checkAuthToken, controller.addMemory)

router.get('/memories', checkAuthToken, controller.getMemories)

router.get('/memories/:id/image', controller.getMemoryImage)

router.put('/update-memory', checkAuthToken, controller.updateMemory)

router.delete('/delete-memory', checkAuthToken, controller.deleteMemory)

module.exports = router


