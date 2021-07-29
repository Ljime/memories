const Memory = require('../models/memory')

// CREATE
exports.addMemory = async (req, res) => {
    
    try {
        if(!req.file) {
            throw new Error('File is not in correct format')
        }

        const memory = new Memory({
            title: req.body.title,
            description: req.body.description,
            image: req.file.buffer,
            userID: req.user._id
        })
        await memory.save()
        res.status(200).send('OK')
        
    } catch (err) {
        console.log(err)
        res.status(400).send(err)        
    }
}

// READ
exports.getMemories = async (req, res) => {

    try {
       // const memories = await req.user.populate('memories').execPopulate()
        const memories = await Memory.find({userID: req.user._id})

        res.status(200).json(memories)

    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getMemoryImage = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id)

        res.set('Content-Type', 'image/jpg')
        res.send(memory.image)
    } catch (err) {
        console.log(err)
        res.status(404).send()
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



