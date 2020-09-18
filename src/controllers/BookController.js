const express = require('express')

const Book = require('../models/Book')
const Category = require('../models/Category')

const router = express.Router()

router.get('/', async (req, res) => {
    const books = await Book.find()

    return res.json(books)
})

router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id

        const book = await Book.findById(bookId)

        if (!book)
            return res.status(404).json({
                error: `Book with id ${bookId} not found.`
            })

        return res.json(book)
    } catch (exception) {
        return res.status(400).json({ exception })
    }
})

router.get('/category/:category', async (req, res) => {
    try {
        const category = await Category.findById(req.params.category)

        console.log(category)

        const books = await Book.find({
            category: category
        })

        return res.json(books)
    } catch (exception) {
        return res.status(400).json({ exception })
    }
})

module.exports = app => app.use('/book', router)