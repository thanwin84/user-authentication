const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
    login,
    register,
    createNewUser,
    checkLogin
} = require('../../controllers/authController')
const isAuth = require('../../middleware/authHandler')
const {validPassword} = require('../../utils/passwordUtils')


router.route('/login')
.get(login)
.post(checkLogin)

router.get('/success', isAuth,(req, res)=>{
    res.status(200).send(`<h1>Success Route ! <a href='/logout'>log Out</a></h1>`)
})
router.get('/failure', (req, res)=>{
    res.send('<h1>Failure Route</h1>')
})

router.get('/logout', (req, res, next)=>{
    req.logout(err =>{
        if (err){
            return next(err)
        }
        res.redirect('/login')
    })
    
})
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next)=>{
    res.status(200).json({success: true, msg: "you are authorized"})
})
router.route('/register')
.get(register)
.post(createNewUser)


module.exports = router