const AppError = require('../errors/AppError')

const errorHandler = (error, req, res, next)=>{
    if (error instanceof AppError){
        res.status(error.statusCode).send({errorCode: error.errorCode, message: error.message})
    }
    
    res.status(500).send({message: "something went wrong"})
}

module.exports = errorHandler