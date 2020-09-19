const Security = require('../services/Security')
const security = require('../services/Security')

module.exports = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({ error: 'No authorization header provided.'})

    const parts = authorization.split(' ')

    if (parts.length != 2)
        return res.status(401).json({ error: 'Malformed authorization header.'})

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Malformed bearer token.'})

    security.validateJwt(token, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token provided.'})

        req.userId = decoded.userId

        return next()
    })
}