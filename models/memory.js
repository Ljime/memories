const mongoose = require('mongoose')

const memorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

const Memory = mongoose.model('Memory', memorySchema)

module.exports = Memory
