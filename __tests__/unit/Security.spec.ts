import Security from '../../src/services/Security'
import moment from 'moment'

describe('Security', () => {

    it('should generate a valid jwt token', async () => {
        const token = Security.generateJwt('123', 80)

        const { exp } = await Security.validateJwt(token)

        if (!exp)
            fail()

        const isAfter = moment.unix(exp).isAfter(moment(new Date()))
        
        expect(isAfter).toBeTruthy()
    })

    it('Should generate a random string', () => {
        const string = Security.randomString(10)

        expect(string).toHaveLength(10)
    })

})