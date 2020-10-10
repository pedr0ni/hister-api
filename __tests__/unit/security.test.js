const Security = require('../../src/services/Security')
const Factory = require('../Factory')
const moment = require('moment')

describe('Security', () => {

    it('should generate a valid jwt token', async () => {
        const token = Security.generateJwt(123, 80)

        const { exp } = await Security.validateJwt(token)

        if (!exp)
            fail()

        const isAfter = moment.unix(exp).isAfter(moment(new Date()))
        
        expect(isAfter).toBeTruthy()
    })

    afterAll(async () => [
        await Factory.dropUsers()
    ])

})