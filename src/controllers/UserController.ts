import express from 'express'
import security from '../services/Security'
import User from '../models/User'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
       const users = await User.find({})
       
       return res.json(users)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

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
    try {
        const { email } = req.body

        if (await User.findOne({ email }))
            return res.status(400).json({message: `O usuário com email ${email} já existe!`})

        const user = await User.create(req.body)

        user.password = undefined // Hide password in response

        return res.json(user)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.use(AuthenticationMiddleware)

router.get('/info', async (req, res) => {
    try {
        const user = await User.findById(req.headers.userId)

        return res.json(user)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.get('/findById/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).json({message: 'Usuário não encontrado.'})

        return res.json(user)

    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// module.exports = app => app.use('/user', router)

export default router