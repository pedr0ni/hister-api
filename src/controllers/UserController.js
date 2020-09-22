const express = require('express')
const jwt = require('jsonwebtoken')
const security = require('../services/Security')

const User = require('../models/User')

const router = express.Router()

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')
    
        if (!user)
            return res.status(404).json({ message: `Usuário com o email ${email} não encontrado.` })
    
        if (!await security.compareHash(password, user.password))
            return res.status(401).json({ message: 'Email ou senha incorreto(s)...'})

        user.password = undefined

        const token = security.generateJwt(user.id, 86000)
        
        return res.json({user, token})
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.post('/register', async (req, res) => {
    const { email } = req.body

    if (await User.findOne({ email }))
        return res.status(400).json({error: `User with email ${email} already exists.`})

    const user = await User.create(req.body)

    user.password = undefined // Hide password in response

    return res.json(user)
})


module.exports = app => app.use('/user', router)