import request from 'supertest'
import Factory from '../../src/Factory'
import Security from '../../src/services/Security'

describe('User Integration', () => {

    it('Should list all users', async () => {

        for (let i = 0; i < 5; i++) {
            await Factory.getUser()
        }

        const response = await request(Factory.getApp()).get('/user').send({})

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(1)
    })

    it('Should show the user information by Id', async () => {
        const user = await Factory.getUser()

        const response = await request(Factory.getApp()).get(`/user/findById/${user.id}`).send({})

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(user.name)
    })

    it('Shoud return an error with a invalid user id', async () => {
        const response = await request(Factory.getApp()).get(`/user/findById/5f7bb23a751222d4e0ab1c65`).send({})

        expect(response.status).toBe(404)
    })

    afterAll(async () => {
        await Factory.destroy()
    })

})