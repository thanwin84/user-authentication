const express = require('express')
const connectToDb = require('./database/connect')
const taskRoutes = require('./v1/routes/taskRoutes')
const authRoutes = require('./v1/routes/auth')
const taskErrorHandler = require('./middleware/ErrorHandler')
const session = require('express-session')
const MongoStore = require("connect-mongo")
require("dotenv").config()
const passport = require('passport')

// need to require the entire passport config module so that
// app.js knows about it
require('./config/passport')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// *******Establish session********

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: "sessions"
})

app.set("trust proxy", 1)
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {  
        maxAge: 1000 * 60 * 60
    }
}))
app.use(passport.authenticate('session'))

// app.use((req,res, next)=>{
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })

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