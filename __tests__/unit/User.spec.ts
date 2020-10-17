import Factory from '../../src/Factory'

describe('User', () => {

    it('User password should be hashed', async () => {
        let password = 'Abc3219@'
        const user = await Factory.getUser({
            password
        })

        expect(user.password).not.toBe(password)
    })

    afterAll(async () => {
        await Factory.destroy()
    })

})