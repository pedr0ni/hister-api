import express from "express"
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'

const router = express.Router()

router.get('/unlocked', async (req, res) => {
    return res.status(200).json({message: 'Essa é uma rota aberta.'})
})

router.use(AuthenticationMiddleware)

router.get('/locked', async (req, res) => {
    return res.status(200).json({message: 'Essa é uma rota fechada.', userId: req.headers.userId})
})

// module.exports = app => app.use('/test', router)

export default router