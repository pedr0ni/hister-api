import express from 'express'
import mongoose from '../database'
import Order, { IOrderBook } from '../models/Order'
import User from '../models/User'
import Book, { IBook } from '../models/Book'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'
import BookService from '../services/BookService'

const router = express.Router()

router.use(AuthenticationMiddleware)

/**
 * Metodo para listar todos pedidos (GET /order)
 * List all Orders
 * Return 200 with an Array of Order
 * Return 500 if exception
 */
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user')

        return res.json(orders)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

/**
 * Metodo para postar um pedido
 * Post an Order
 * Return 200 with a Order
 * Return 500 if exception
 * Return 400 if books == null or books.length <= 0
 */
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.headers.userId)
        let books: Array<IBook> = req.body

        const message = 'Você não pode postar um pedido sem nenhum livro.'

        if (!books)
            return res.status(400).json({
                message
            })

        if (books && books.length <= 0) 
            return res.status(400).json({
                message
            })

        // Remove invalid oboks
        let booksFiltered = await books.filter(async entry => {
            const book = await Book.findById(entry._id)

            return book != undefined
        })

        // Map books to price, title and id
        let booksArray: Array<IOrderBook> = BookService.toOrderBookArray(booksFiltered)
        
        // Calculate the price
        const priceArray = booksArray.map(entry => entry.price)
        const totalPrice = booksArray.length > 1 ? priceArray.reduce((a, b) => a + b) : booksArray[0].price

        if (user.credit < totalPrice)
            return res.status(400).json({message: 'Você não possui saldo sucifiente para efetuar esse pedido.'})

        // Create the order
        const order = await Order.create({
            user: user.id,
            books: booksArray,
            totalPrice,
            status: "PENDING"
        })

        const removedMessage = books.length != booksFiltered.length 
            ? 'Alguns livros foram removidos do carrinho pois não foram encontrados no sistema' 
            : 'Pedido realizado com sucesso!'

        await User.updateOne({
            _id: user.id
        }, {
            $set: {
                credit: user.credit - totalPrice
            }
        })

        return res.json({order, message: removedMessage})
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

/**
 * Metodo para atualizar as infos de um pedido
 * Update an order
 * Return 200 if success
 * Return 500 if exception
 * Return 404 if order = null
 * Return 400 if invalid payload
 */
router.put('/', async (req, res) => {
    try {
        const { _id } = req.body
        let order = await Order.findById(_id)

        if (!order)
            return res.status(404).json({message: "Esse pedido não pode ser encontrado no sistema."})

        await Order.updateOne({
            _id: order.id
        }, {
            $set: req.body
        })

        order = await Order.findById(order.id)

        return res.json(order)
    } catch (exception) {
        console.error(exception)
        return res.status(500).json(exception)
    }
})

// module.exports = app => app.use('/order', router)

export default router