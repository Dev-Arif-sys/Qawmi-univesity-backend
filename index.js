const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userHandler = require('./routeHandler/userHandler')
const connectDB = require('./config/db')
const app = express()
const port = 4000
const cors = require('cors')
const crypto=require('crypto')

app.use(express.json())
app.use(cors())
dotenv.config()

// connecting mongodb
connectDB()




app.get('/', async (req, res) => {
    res.send('hello server')
})

console.log(crypto
    .createHash("sha256")
    .update('aff3158ce4efa379c27246ecba4c4682bec27863')
    .digest("hex"))
app.use('/user', userHandler)



const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({ error: err })
    console.log(err)
}
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})