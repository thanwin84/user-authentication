const {createHash} = require('crypto')

function hash(str){
    return createHash('sha256').update(str).digest('hex')
}

let password = "thanwin"
const hash1 = hash(password)
console.log(hash1)

password = "thanwin"
const hash2 = hash(password)
console.log(hash2)

const match = hash1 === hash2

console.log(match)