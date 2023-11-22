const crypto = require('crypto')

/**
 * 
 * @param {string} password - the plane text password
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

module.exports = {
    validPassword,
    genPassword
}