import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import environment from '../environment'

environment.load()

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export interface IToken {
    exp: number,
    iat: number,
    userId: string
}

let randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {

    generateJwt: (identifier: string, expiration: number) => {
        return jwt.sign({ userId: identifier }, process.env.SECRET, {
            expiresIn: expiration
        })
    },

    validateJwt: async (token: string) : Promise<IToken> => {

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    reject(err)
                else
                    resolve(decoded as IToken)
            })
        })
    },

    compareHash: (hash: string, hashToCompare: string) => {
        return bcrypt.compare(hash, hashToCompare)
    },

    randomString: (length: number) => {
        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += alphabet.charAt(randomInteger(0, alphabet.length))
            console.log(generated)
        }
        return generated
    },
}