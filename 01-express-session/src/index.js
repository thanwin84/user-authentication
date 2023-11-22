const express = require('express')
const connectToDb = require('./database/connect')
const taskRoutes = require('./v1/routes/taskRoutes')
const taskErrorHandler = require('./middleware/ErrorHandler')
const session = require('express-session')
const MongoStore = require("connect-mongo")
require("dotenv").config()


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

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
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}))

app.use('/api/v1/tasks', taskRoutes)
app.get('/', (req, res)=>{
    console.log(req.session)
    res.send("hello world")
})

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
app.use(taskErrorHandler)
startServer()