import express from 'express'
import User from '../models/User'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'
import Book from '../models/Book'
import Order from '../models/Order'

const router = express.Router()

router.use(AuthenticationMiddleware)

// Metodo para trazer as informacoes da home
router.get('/', async (req, res) => {
    try {

        const users = await User.count({})
        const books = await Book.count({})
        const orders = await Order.count({})

        return res.json({
            users, books, orders
        })

    } catch (exception) {
        res.status(500).json(exception)
    }
})

export default router