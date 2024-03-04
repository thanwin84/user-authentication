import {scryptSync, randomBytes, timingSafeEqual} from 'crypto'

const users = []
function signup(email, password){
    // generat a random salt and convert it to hexadecimal string
    const salt = randomBytes(16).toString('hex')
    // hash the password
    const hashedPassword = scryptSync(password, salt, 64).toString('hex')

    const user = {email, password: `${salt}:${hashedPassword}`}
    users.push(user)

    return user
}

function login(email, password){
    // retrieve user by email
    const user = users.find(v =>v.email === email)
    // get the salt and hashed password from db
    const [salt, key] = user.password.split(":")
    // hash the given password with the salt(retreived from db)
    const hashedBuffer = scryptSync(password, salt, 64)

    //  convert the stored key(hashed password) from hexadecimal to buffer
    const keyBufffer = Buffer.from(key, 'hex')
    // it is used to determine whether two variables are equal without exposing timing information that may allow an attacker to guess one of the values.
    const match = timingSafeEqual(hashedBuffer, keyBufffer)

    if (match){
        console.log('login success!')
    } else {
        console.log("logn fail")
    }
}

const user = signup('win@mail.com', "password123")
login('win@mail.com', "password123")
console.log(user)
