import express from 'express'
import security from '../services/Security'
import User from '../models/User'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'
import { IBook } from '../models/Book'
import BookService from '../services/BookService'

const router = express.Router()

// Metodo para listar os usuarios (GET /user)
router.get('/', async (req, res) => {
    try {
       const users = await User.find({})
       
       return res.json(users)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para autenticar um usuario (POST /user/authenticate)
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

// Metodo para registar um usuario (POST /user/register)
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

// Metodo para listar o carrinho do usuario (GEt /user/cart)
router.get('/cart', async (req, res) => {
    try {
        const user = await User.findById(req.headers.userId)

        return res.json(user.cart)
    } catch (exception) {
        console.error(exception)
        return res.status(500).json(exception)
    }
})

// Metodo para adicionar um livro ao carrinho do usuario (POST /user/cart)
router.post('/cart', async (req, res) => {
    try {
        const book: IBook = req.body
        const user = await User.findById(req.headers.userId)

        user.cart.push(BookService.toOrderBook(book))

        console.log(user.cart)

        await User.updateOne({
            _id: user.id
        }, {
            $set: {
                cart: user.cart
            }
        })

        return res.json(user.cart)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para limpar o carrinho do usuario (PATCH /user/cart)
router.patch('/cart', async (req, res) => {
    try {
        const user = await User.findById(req.headers.userId)

        await User.updateOne({
            _id: user.id
        }, {
            $set: {
                cart: []
            }
        })

        return res.json(user.cart)

    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para deletar um livro do carrinho do usuario (DELETE /user/cart)
router.delete('/cart', async (req, res) => {
    try {
        const book: IBook = req.body
        const user = await User.findById(req.headers.userId)

        if (user.cart.some(b => b._id == book._id)) {

            user.cart = user.cart.filter(b => b._id != book._id)

            await User.updateOne({
                _id: user.id
            }, {
                $set: {
                    cart: user.cart
                }
            })
        }

        return res.json(user.cart)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.get('/info', async (req, res) => {
    try {
        const user = await User.findById(req.headers.userId)

        return res.json(user)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para listar as informacoes de usuario por id (GET /user/findById/:id)
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