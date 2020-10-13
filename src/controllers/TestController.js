const express = require('express')

const router = express.Router()

router.get('/unlocked', async (req, res) => {
    return res.status(200).json({message: 'Essa é uma rota aberta.'})
})

router.use(require('../middlewares/AuthenticationMiddleware'))

router.get('/locked', async (req, res) => {
    return res.status(200).json({message: 'Essa é uma rota fechada.', userId: req.userId})
})

module.exports = app => app.use('/test', router)