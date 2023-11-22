const {
    createCipheriv,
    randomBytes,
    createDecipheriv
} = require('crypto')
// Symmetric encryption uses a single key to encrypt and decrypt.
/// cipher
const message = "I love animals"
const key = randomBytes(32)
const iv = randomBytes(16)

const cipher = createCipheriv('aes256', key, iv)

/// encrypt
const encryptedMessage = cipher.update(message, "utf-8", 'hex') + cipher.final('hex')
console.log(encryptedMessage)
//decrypt
const decipher = createDecipheriv('aes256', key, iv)
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final("utf-8")
console.log(decryptedMessage.toString('utf-8'))