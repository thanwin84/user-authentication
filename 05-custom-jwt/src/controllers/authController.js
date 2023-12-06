const {asyncWrapper} = require('../utils/utils')
const httpStatusCode = require('../constants/httpStatusCode')
const AppError = require('../errors/AppError')
const {genPassword, validPassword} = require('../utils/utils')
const User = require('../models/user')
const {issueJWT} = require('../utils/issueJWT')
const errorHandler = require('../middleware/ErrorHandler')

// todo
const login = asyncWrapper(async(req, res)=>{
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form)

})
const register = asyncWrapper(async(req, res)=>{
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

const createNewUser = asyncWrapper(async(req, res, next)=>{
    const {pw, uname} = req.body
    const {salt, hash} = genPassword(pw)
   
    const newUser = new User({
        username: uname,
        salt: salt,
        hash: hash
    })
    newUser.save()
        .then(user =>{
            const jwt = issueJWT(user)
            
            res.send({
                success: true,
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires
            })
        })
        .catch(err => next(err))
})
const checkLogin = asyncWrapper(async(req, res, next)=>{
    User.findOne({username: req.body.uname})
        .then(user => {
            if (!user){
                return res.status(401).json({
                    success: false,
                    msg: "Could not find user"
                })
            }
            const isValid = validPassword(req.body.pw, user.hash, user.salt)

            if (isValid){
                const tokenObject = issueJWT(user)
                res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "You entered wrong credentials"
                })
            }
        })
        .catch(err => next(err))

    
})
module.exports = {
    login,
    register,
    createNewUser,
    checkLogin
}

