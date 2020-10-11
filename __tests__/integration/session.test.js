const app = require("../../src/app")
const request = require('supertest')
const faker = require('faker')
const Security = require("../../src/services/Security")
const Factory = require('../Factory')

describe('Session', () => {

    it('Should not authorize a request with no auth header provided', async () => {
        const response = await request(app).get('/user/info').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a malformed auth header', async () => {
        const response = await request(app).get('/user/info').set('Authorization', 'Bearer').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a malformed Bearer token', async () => {
        const response = await request(app).get('/user/info').set('Authorization', 'Token 123').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should not authorize a request with a invalid Bearer token', async () => {
        const response = await request(app).get('/user/info').set('Authorization', 'Bearer 123').send({})

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('Should authorize a request with a valid Bearer token', async () => {
        const user = await Factory.create('User')

        const token = await Security.generateJwt(user._id, 300)

        const response = await request(app).get('/user/info').set('Authorization', `Bearer ${token}`).send({})

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(user.id)
    })

    afterAll(async () => {
        await app.disconnect()
    })
    
})