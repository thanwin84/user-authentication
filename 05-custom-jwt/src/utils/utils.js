const crypto = require('crypto')
const {publicKey} = require('../jwt/keypairs')
const jsonwebtoken = require('jsonwebtoken')

function asyncWrapper(controller){
    return async (req, res, next)=>{
      try {
        await controller(req, res)
      } catch (error) {
        next(error)
      }
    }
}


/**
 * 
 * @param {string} password -the plane text password
 * @param {string} hash - the hash stored in the database
 * @param {string} salt - the salt stored in the database
 */
function validPassword(password, hash, salt){
    var hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}
/**
 * 
 * @param {string} password - the plane text password 
 */
function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex')
    var genHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    return {
        salt: salt,
        hash: genHash
    }
}

function authMiddleware(req, res, next){
    let tokenParts = ""
    if (req.headers.authorization){
        tokenParts = req.headers.authorization.split(" ")
    }
    if (tokenParts && tokenParts[0] === "Bearer" && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null){
        
        try {
            const verification = jsonwebtoken.verify(tokenParts[1], publicKey, {algorithms:['RS256']})
            next()
        } catch (error) {
            res.status(401).send({msg: "you are not authorized"})
        }
        
    }else {
        res.status(401).send({msg: "you are not authorized"})
    }
    
}

module.exports = {
    genPassword,
    validPassword,
    asyncWrapper,
    authMiddleware
}