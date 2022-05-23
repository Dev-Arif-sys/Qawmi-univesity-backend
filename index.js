const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userHandler = require('./routeHandler/userHandler')
const connectDB = require('./config/db')
const app = express()
const port = 4000

app.use(express.json())
dotenv.config()

// connecting mongodb
connectDB()




app.get('/', async (req, res) => {
    res.send('hello server')
})


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