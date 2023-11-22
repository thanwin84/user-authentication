const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
const {
    validPassword
} = require('../utils/passwordUtils')

const customField = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const verifyCallback = (username, password, done)=>{

    User.findOne({username: username})
        .then((user)=>{
            if (!user){
                return done(null, false)
            }
            const isValid = validPassword(password, user.hash, user.salt)

            if (isValid){
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
        .catch((err)=>{
            done(err)
        })
}

const strategy = new localStrategy(customField, verifyCallback)

passport.use(strategy)

/*
This function is used when a user logs in. Its purpose is to detemine which data of the object should be stored in the session.
The user parameter is the user object that is passed by Passport, and done is a callback function that should be called with an error (if any) and the user identifier.
In this case, it simply uses the user's id property as the identifier to be stored in the session. The user.id value will be stored in the session and can be used to retrieve the user's information later.
*/
passport.serializeUser((user, done) => {
    done(null, user.id);
});
/*
This function is called on subsequent requests after the user has logged in. 
Its purpose is to look up the user information based on the identifier (user ID) that was stored in the session during serialization.
*/
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});