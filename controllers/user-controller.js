const User = require('../models/user')

exports.getUser = (req, res) => {
    
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password).catch(err => {
            console.log(err)
            throw new Error(err)
        })
        const token = await user.generateToken()
        res.status(200).send({user, token})

    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}


exports.signUpUser = async (req, res) => {

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        await user.hashPassword()
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({user, token})

    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

}

exports.deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(req.body.id)
        res.status(200).send('OK')

    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}


