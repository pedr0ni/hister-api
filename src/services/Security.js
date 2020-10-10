const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {

    generateJwt: (identifier, expiration) => {
        return jwt.sign({ userId: identifier }, process.env.SECRET, {
            expiresIn: expiration
        })
    },

    validateJwt: (token) => {

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    reject(err)
                else
                    resolve(decoded)
            })
        })
    },

    compareHash: (hash, hashToCompare) => {
        return bcrypt.compare(hash, hashToCompare)
    },

    randomString: (length) => {
        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += alphabet.charAt(randomInteger(0, alphabet.length))
        }
        return generated
    },
}