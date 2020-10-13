const faker       = require('faker')
const Category = require('../src/models/Category')
const User        = require('../src/models/User')
const app = require('../src/app')

require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

module.exports = {
    async drop() {
        await User.deleteMany({})
        await Category.deleteMany({})
    },
    async getUser(params = {}) {
        return await User.create({
            name: params.name ? params.name : faker.name.findName(),
            email: params.email ? params.email : faker.internet.email(),
            birth: params.birth ? params.birth : faker.date.past(),
            password: params.password ? params.password : faker.internet.password()
        })
    },
    getApp() {
        return app
    },
    async destroy() {
        console.log('[Factory] Bye...')
        await User.deleteMany({})
        await Category.deleteMany({})
        await app.disconnect()
        console.log('[Factory] Dead!')
    }
}