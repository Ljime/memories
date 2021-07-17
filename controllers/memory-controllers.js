const Memory = require('../models/memory')

// CREATE
exports.addMemory = async (req, res) => {
    
    try {
        const memory = new Memory({
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageURL
        })
        await memory.save()
        res.status(200).send('OK')
        
    } catch (err) {
        res.status(400).send(err)        
    }
}

// READ
exports.getMemories = async (req, res) => {

    try {
        const memories = await Memory.find()
        res.status(200).json(memories)

    } catch (err) {
        res.status(400).send(err)
    }
}

// UPDATE
exports.updateMemory = async (req, res) => {

    try {
        await Memory.findByIdAndUpdate(
             req.body.id,
             req.body.updatedMemory)
        res.status(200).json('OK')

    } catch (err) {
        res.status(400).send(err)
    }

}

// DELETE
exports.deleteMemory = async (req, res) => {

    try {
        await Memory.findByIdAndDelete(req.body.id)
        res.status(200).json('OK')

    } catch (err) {
        res.status(400).send(err)
    }
}


