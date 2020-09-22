const jwt = require('jsonwebtoken')
const authenticationConfig = require('../config/authentication.json')
const bcrypt = require('bcryptjs')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {

    generateJwt: (identifier, expiration) => {
        return jwt.sign({ userId: identifier }, authenticationConfig.secret, {
            expiresIn: expiration
        })
    },

    validateJwt: (token, callback) => {
        return jwt.verify(token, authenticationConfig.secret, (err, decoded) => {
            callback(err, decoded)
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