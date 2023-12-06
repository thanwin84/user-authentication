const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const passport = require('passport')

const User = require('../models/user')
const {publicKey} = require('../jwt/keypairs')


// todo
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithm: ['RS256']
}
const strategy = new JWTStrategy(options, (payload, done)=>{
    User.findOne({_id: payload.sub})
        .then(user=>{
            if (user){
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
        .catch(err => done(err, null))
})

passport.use(strategy)