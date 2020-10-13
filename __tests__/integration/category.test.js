const app = require('../../src/app')
const faker = require('faker')
const request = require('supertest')
const factory = require('../Factory')

describe('Category', () => {

    it('Should be able to create a category', async () => {

        const name = faker.name.title()

        const response = await request(app).post('/category').send({
            name,
            index: 1,
            image: 'No image'
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('name')
        expect(response.body.name).toBe(name)

    })

    it('Should list all categories', async () => {
        const response = await request(app).get('/category').send({})

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    })

    afterAll(async () => {
        await factory.dropCategory()
        await app.disconnect()
    })

})