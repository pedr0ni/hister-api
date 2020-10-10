const security = require('../services/Security')

module.exports = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({ message: 'No authorization header provided.'})

    const parts = authorization.split(' ')

    if (parts.length != 2)
        return res.status(401).json({ message: 'Malformed authorization header.'})

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ message: 'Malformed bearer token.'})

    
    const parsedToken = await security.validateJwt(token)

    if (parsedToken) {
        req.userId = parsedToken.userId
        return next()
    }
    
    return res.status(401).json({ error: 'Invalid token provided.'})
}