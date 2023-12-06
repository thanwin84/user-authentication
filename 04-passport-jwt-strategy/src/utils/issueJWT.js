const User = require('../models/user')
const {privateKey} = require('../jwt/keypairs')
const jsonwebtoken = require('jsonwebtoken')

function issueJWT(user){
    const _id = user._id

    const expiresIn = "1d"

    const payload = {sub: _id, iat: Date.now()}
    const signedToken = jsonwebtoken.sign(payload, privateKey, {expiresIn: expiresIn, algorithm: 'RS256'} )

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}
module.exports = {
    issueJWT
}