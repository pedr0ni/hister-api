const request = require('supertest')
const Security = require("../../src/services/Security")
const Factory = require('../Factory')

describe('Session', () => {

    it('Should not authorize a request with no auth header provided', async () => {
        const response = await request(Factory.getApp()).get('/test/locked').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a malformed auth header', async () => {
        const response = await request(Factory.getApp()).get('/test/locked').set('Authorization', 'Bearer').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a malformed Bearer token', async () => {
        const response = await request(Factory.getApp()).get('/test/locked').set('Authorization', 'Token 123').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a invalid Bearer token', async () => {
        const response = await request(Factory.getApp()).get('/test/locked').set('Authorization', 'Bearer 123').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should authorize a request with a valid Bearer token', async () => {
        const user = await Factory.getUser()

        const token = await Security.generateJwt(user._id, 300)

        const response = await request(Factory.getApp()).get('/test/locked').set('Authorization', `Bearer ${token}`).send({})

        expect(response.status).toBe(200)
        expect(response.body.userId).toBe(user.id)
    })

    it('Should authorize a request to a public route without a valid token', async () => {
        const response = await request(Factory.getApp()).get('/test/unlocked').send({})

        expect(response.status).toBe(200)
    })

    afterAll(async () => {
        await Factory.destroy()
    })
    
})