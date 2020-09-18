const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.post('/authenticate', async (req, res) => {
    
})

router.post('/create', async (req, res) => {
    const { email } = req.body

    if (await User.findOne({ email }))
        return res.status(400).json({error: `User with email ${email} already exists.`})

    const user = await User.create(req.body)

    user.password = undefined // Hide password in response

    return res.json(user)
})


module.exports = app => app.use('/user', router)