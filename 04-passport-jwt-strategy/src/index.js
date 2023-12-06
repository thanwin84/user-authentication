const express = require('express')
const connectToDb = require('./database/connect')
const taskRoutes = require('./v1/routes/taskRoutes')
const authRoutes = require('./v1/routes/auth')
const taskErrorHandler = require('./middleware/ErrorHandler')
const passport = require('passport')

require("dotenv").config()

// need to require the entire passport config module so that
// app.js knows about it
require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))



//********use routes*********

app.use('/api/v1/tasks', taskRoutes)
app.use('/', authRoutes)



const startServer = async()=>{
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log("successfully connected to to db")
        app.listen(PORT, (req, res)=>{
            console.log("server is listenning on port ", PORT)
        })
    } catch (error) {
        console.log(error)
    }
}
// *** Error Handler ************
app.use(taskErrorHandler)

startServer()