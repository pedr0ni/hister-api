const User = require("../../src/models/User")

const Factory = require('../Factory')


describe('User', () => {

    it('User password should be hashed', async () => {
        let password = 'Abc3219@'
        const user = await Factory.create('User', {
            password
        })

        expect(user.password).not.toBe(password)
    })

    afterAll(async () => {
        await Factory.dropUsers()
    })

})