const AppError = require('../errors/AppError')

const errorHandler = (error, req, res, next)=>{
    if (error instanceof AppError){
        res.status(error.statusCode).send({errorCode: error.errorCode, message: error.message})
    }
    console.log(error)
    res.status(500).send({message: "something went wrong", error: error})
}

module.exports = errorHandler