const asyncWrapper = require('../utils/asyncWrapper')
const httpStatusCode = require('../constants/httpStatusCode')
const AppError = require('../errors/AppError')


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
    console.log(1000)
    newUser.save()
    res.send('<h1>You have created account successfully !</h1>')
})
module.exports = {
    login,
    register,
    createNewUser
}

