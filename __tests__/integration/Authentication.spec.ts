import Factory from '../../src/Factory'
import faker from 'faker'
import request from 'supertest'

describe('Authentication', () => {

    it('Should be able to register a new user', async () => {
        const response = await request(Factory.getApp()).post('/user/register').send({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            birth: faker.date.past()
        })

        expect(response.status).toBe(200)
    })

    it('Should not be able to register an existing email', async () => {
        const user = await Factory.getUser()

        const response = await request(Factory.getApp()).post('/user/register').send({
            name: faker.name.findName(),
            email: user.email,
            password: faker.internet.password(),
            birth: faker.date.past()
        })

        expect(response.status).toBe(400)
    })

    it('Should be able to authenticate with a valid user', async () => {

        const password = '123'
        const user = await Factory.getUser({
            password
        })

        const response = await request(Factory.getApp()).post('/user/authenticate').send({
            email: user.email,
            password
        })

        expect(response.status).toBe(200)
    })

    it('Should not be able to login with a invalid email', async () => {
        const user = await Factory.getUser()

        const response = await request(Factory.getApp()).post('/user/authenticate').send({
            email: 'invalid+email@gmail.com',
            password: user.password
        })

        expect(response.status).toBe(404)
    })

    it('Should not be able to login with a invalid password', async () => {
        const user = await Factory.getUser()

        const response = await request(Factory.getApp()).post('/user/authenticate').send({
            email: user.email,
            password: 'invalid-password'
        })

        expect(response.status).toBe(401)
    })

    afterAll(async () => {
        await Factory.destroy()
    })
    
})