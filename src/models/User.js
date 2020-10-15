const bcrypt = require('bcryptjs')
const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birth: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    credit: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User', UserSchema, 'Users')

module.exports = User