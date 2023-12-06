const jwt = require('jsonwebtoken')
const {publicKey, privateKey} = require('./keypairs')

const payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
}

const signedJWT = jwt.sign(payload, privateKey, {algorithm: 'RS256'})

jwt.verify(signedJWT, publicKey, {algorithms: ['RS256']}, (err, payload)=>{
    console.log(payload)
})