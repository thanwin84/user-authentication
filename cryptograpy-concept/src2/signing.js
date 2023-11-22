const { createSign, createVerify } = require('crypto')
const { publicKey, privateKey } = require('./keypair')

/*
Signing is the process of creating a digital signature of a message. A signature is a hash of the original message which is then encrypted with the sender’s private key.

The signature can be verified by the recipient using the public key of the sender. This can guarantee the original message is authentic and unmodified.
*/
const data = "They are coming to the north"
// sign
const signer = createSign('rsa-sha256')
signer.update(data)

const signature = signer.sign(privateKey, 'hex')
console.log(signature)

// verify
const verifier = createVerify('rsa-sha256')
verifier.update(data)
const isVerified = verifier.verify(publicKey, signature, 'hex')

console.log(isVerified)