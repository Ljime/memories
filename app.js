const express = require('express')
const path = require('path')
const multer = require('multer')
require('./db/db') // connect to database

const storyRouter = require('./routers/memory-router')
const userRouter = require('./routers/user-router')

const app = express()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb (null, false)
    }
}

const fileStorage = multer.memoryStorage({
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

app.use(express.urlencoded({extended: false}))
app.use(multer({storage: fileStorage}).single('image'))
app.use(express.json())

app.use(storyRouter)
app.use(userRouter)

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))
    app.get('*' , (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port)


