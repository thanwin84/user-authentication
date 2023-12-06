// const base64url = require('base64url')

// const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// const jwtParts = jwt.split('.')

// const headerInBaseUrlFormat = jwtParts[0]
// const payloadInBaseUrlFormat = jwtParts[1]
// const signatureInBaseUrlFormat = jwtParts[2]

// const a = base64url.decode(headerInBaseUrlFormat)
// const b = base64url.decode(payloadInBaseUrlFormat)
// const c = base64url.decode(signatureInBaseUrlFormat)

// console.log(a, b, c)


const base64url = require('base64url')
const crypto = require('crypto')

const headerObj = {
    alg: "RS256",
    typ: "JWT"
}
const payloadObj = {"sub":"1234567890","name":"John Doe","iat":1516239022}

const headerObjString = JSON.stringify(headerObj)
const payloadObjString = JSON.stringify(payloadObj)

const base64rlHeader = base64url(headerObjString)
const base64urlPayload = base64url(payloadObjString)

// sign the data
const signer = crypto.createSign('RSA-SHA256')
signer.update(`${base64rlHeader}.${base64urlPayload}`)
const base64signature = signer.sign(privateKey, 'base64')
const base64urlSignature = base64url.fromBase64(base64signature)

// verify the signature
const verifier = crypto.createVerify('RSA-SHA256')
verifier.update(`${base64rlHeader}.${base64urlPayload}`)
const isVerified = verifier.verify(publicKey, base64urlSignature, 'base64')
console.log(isVerified)