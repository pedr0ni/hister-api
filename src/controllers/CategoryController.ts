import express from 'express'
import Category from '../models/Category'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'

const router = express.Router()

router.use(AuthenticationMiddleware)

// Metodo para listar todas categorias
router.get('/', async (req, res) => {
    const categories = await Category.find()

    return res.json(categories)
})

// Metodo para adicionar uma categoria
router.post('/', async (req, res) => {
    const category = await Category.create(req.body)

    return res.json(category)
})

// module.exports = app => app.use('/category', router)

export default router