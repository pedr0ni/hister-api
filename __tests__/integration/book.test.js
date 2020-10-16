const request = require('supertest')
const Factory = require('../Factory')

describe('Book', () => {

    it('Should be able to create a book', async () => {

        const title = ''
        const response = await request(Factory.app).post('/book').send({
            
        })

        expect(response.status).toBe(200)
        expect(response.body.title).toBe(title)

    })

})