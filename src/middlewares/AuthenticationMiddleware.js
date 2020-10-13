const security = require('../services/Security')

console.log('Auth middleware is loaded')

module.exports = async (req, res, next) => {

    /**
     * Ignores all routes in test environment 
     * (/user/info is the route used for session integration tests)
     */
    if (process.env.NODE_ENV == 'test' && req.baseUrl.indexOf('test') == -1) {
        next()
        return
    }

    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({ message: 'No authorization header provided.'})

    const parts = authorization.split(' ')

    if (parts.length != 2)
        return res.status(401).json({ message: 'Malformed authorization header.'})

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ message: 'Malformed bearer token.'})

    
    try {
        const parsedToken = await security.validateJwt(token)

        if (parsedToken) {
            req.userId = parsedToken.userId
            return next()
        }
    } catch (exception) {
        return res.status(401).json({ message: 'The provided token is invalid or it already expired.'})
    }
}