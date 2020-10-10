const { factory } = require('factory-girl')
const faker       = require('faker')
const User        = require('../src/models/User')

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birth: faker.date.past(),
    createdAt: faker.date.past()
})

factory.dropUsers = async () => {
    await User.deleteMany({})
}

factory.app = require('../src/app')

module.exports = factory