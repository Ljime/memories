const express = require('express')
const path = require('path')

require('./db/db') // connect to database

const storyRouter = require('./routers/memory-router')
const userRouter = require('./routers/user-router')

const app = express()

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

