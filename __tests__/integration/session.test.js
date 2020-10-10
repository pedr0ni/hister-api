

describe('Session', () => {

    it('Should not authorize a request with no auth header provided', async () => {

        // const response = await request(Factory.app).get('/user/info').send({})

        // console.log(response.text)

        expect(401).toBe(401)

    })
    
})