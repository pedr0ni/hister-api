const encrypt = require('js-sha256')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    hash: (value) => {
        return encrypt(value)
    },

    randomString: (length) => {
        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += alphabet.charAt(randomInteger(0, alphabet.length))
        }
        return generated
    },
}