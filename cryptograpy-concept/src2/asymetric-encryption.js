const {publicEncrypt, privateDecrypt} = require('crypto')
const {publicKey, privateKey} = require('./keypair')

const secretMessage = "They are coming right now"

const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(secretMessage)
)
console.log(encryptedData.toString('hex'))
const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
)

console.log(decryptedData.toString())