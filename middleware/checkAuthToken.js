const jwt = require('jsonwebtoken')
const User = require('../models/user')

const checkAuthToken = async (req, res, next) => {

    try {
        const token = req.header('Authorization')
        console.log(token)
    } catch (e) {
        res.status(401).send('Please Authenticate')
    }
    next()
}

module.exports = checkAuthToken