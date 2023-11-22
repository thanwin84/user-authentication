
const {scryptSync, randomBytes, timingSafeEqual} = require('crypto')

const users = []

function signUp(email, password){
    const salt = randomBytes(16).toString('hex')
    const hashedPassword = scryptSync(password, salt, 64).toString('hex')

    const user = {email: email, hash: hashedPassword, salt: salt}
    users.push(user)
    return user
}

function login(email, password){
    const user = users.find(user => user.email === email)
    const {salt, hash} = user
    const hashedBuffer = scryptSync(password, salt, 64)

    const keyBuffer = Buffer.from(hash, 'hex')
    const match = timingSafeEqual(hashedBuffer, keyBuffer)

    if (match){
        console.log("login success!")
    }
    else {
        console.log("login Failed")
    }
}

signUp("bob@mail.com", "10101010")
login("bob@mail.com", "10101010")
