const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
    login,
    register,
    createNewUser
} = require('../../controllers/authController')
const isAuth = require('../../middleware/authHandler')
router.route('/login')
.get(login)
.post(passport.authenticate('local', {failureRedirect: '/failure', successRedirect: "/success"}))

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

router.route('/register')
.get(register)
.post(createNewUser)


module.exports = router