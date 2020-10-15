const express = require('express')
const mongoose = require('../database')
const Order = require('../models/Order')
const User = require('../models/User')
const Book = require('../models/Book')

const router = express.Router()

router.use(require('../middlewares/AuthenticationMiddleware'))

/**
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
 * Post an Order
 * Return 200 with a Order
 * Return 500 if exception
 * Return 400 if books == null or books.length <= 0
 */
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        let books = req.body

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
        booksFiltered = await books.map(entry => {
            return {
                _id: mongoose.Types.ObjectId(entry._id),
                title: entry.title,
                price: entry.price
            }
        })
        
        // Calculate the price
        const totalPrice = await books.reduce((a, b) => a.price + b.price)

        if (user.credit < totalPrice)
            return res.status(400).json({message: 'Você não possui saldo sucifiente para efetuar esse pedido.'})

        // Create the order
        const order = await Order.create({
            user: user.id,
            books: booksFiltered,
            totalPrice,
            status: "PENDING"
        })

        const removedMessage = books.length != booksFiltered.length 
            ? 'Alguns livros foram removidos do carrinho pois não foram encontrados no sistema' 
            : 'Pedido realizado com sucesso!'

        return res.json({order, message: removedMessage})
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

/**
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

module.exports = app => app.use('/order', router)
