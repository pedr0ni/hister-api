const request = require('supertest')
const Factory = require('../Factory')

describe('User Integration', () => {

    it('Should list all users', async () => {

        for (let i = 0; i < 5; i++) {
            await Factory.getUser()
        }

        const response = await request(Factory.getApp()).get('/user').send({})

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(1)
    })

    afterAll(async () => {
        await Factory.destroy()
    })

})