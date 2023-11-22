/*
HMAC: HMAC stands for Hashed-based Message Authentication Code and is used to verify the integrity and authenticity of a message.
HMAC can be used with any iterative cryptographic hash function e.g., MD5, shah-1, shah-256, shah-512 in combination with a shared secret key
if used with MD5, it is called HMAC-MD5
if used with SHAH-1, it is called HMAC-SHA1

once the HMAC hash is calculated, the message must be sent alongside the HMAC hash.

The sender computes the HMAC using a secret key and attaches it to the message. 
The recipient, who knows the secret key, computes the HMAC on the received message and verifies it against the received HMAC.
*/
const {createHmac} = require('crypto')

const sharedKey = "super-secret-key"
const message = "Hello, Sen"

const hmac = createHmac('sha256', sharedKey).update(message).digest('hex')
console.log(hmac)
const anotherkey = "another-key"
const hmac2 = createHmac('sha256', anotherkey).update(message).digest('hex')
console.log(hmac2)
