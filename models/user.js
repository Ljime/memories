const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'No Username Provided'],
        unqiue: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'No Email Provided'],
        unqiue: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        min: 6,
        required: [true, 'No Password Provided']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('memories', {
    ref: 'Memory',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.statics.findByCredentials = async (userEmail, userPassword) => {
    const user = await User.findOne({email: userEmail})

    if(!user) {
        throw new Error('Email does not exist!')
    }

    const passwordMatches = await bcrypt.compare(userPassword, user.password)

    if (!passwordMatches) {
        throw new Error('Password is invalid!')
    }

    return user
}

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, 'secret', {expiresIn: '3600000'})
    this.tokens.push({token})
    await this.save()
    return token
}

userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 8) 
}

userSchema.methods.checkDupeCredentials = async function () {
    // Check If Email or Username already exists unqiue not working atm
    const usernameExists = await User.findOne({username: this.username})
    if (usernameExists) {
        throw new Error('Username already exists!')
    }
    
    const emailExists = await User.findOne({email: this.email})
    if (emailExists) {
        throw new Error('Email already exists!')
    }
}

// userSchema.pre('save', async function (next) {


//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User

