const express = require('express')

const Book = require('../models/Book')
const Category = require('../models/Category')

const router = express.Router()

router.use(require('../middlewares/AuthenticationMiddleware'))

router.get('/', async (req, res) => {
    try {
        let { page = 0, search } = req.query

        page = parseInt(page)
        const skip = page * 10
    
        const take = 10
        const query = {
            title: {
                $regex: search
            }
        }
        const pages = Math.floor(search ? await Book.find(query).countDocuments() : await Book.countDocuments() / take)

        const books = await Book.find(search ? query : {})
        .skip(skip)
        .limit(take)
        .sort({
            title: 'asc'
        })
        .populate('category')

        return res.json({books, pagination: {
            page, pages, results: books.length
        }})
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.get('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        const book = await Book.findById(bookId).populate('category')

        if (!book)
            return res.status(404).json({
                error: `Book with id ${bookId} not found.`
            })

        return res.json(book)
    } catch (exception) {
        return res.status(500).json(exception)
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
        return res.status(500).json(exception)
    }
})

router.delete('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        const book = await Book.findById(bookId)
        if (!book)
            return res.status(404).json({ error: `O livro com id ${bookId} não foi encontrado.` })

        await Book.deleteOne({
            _id: book.id
        })
        return res.json({ message: `O livro ${book.title} foi removido.` })
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

module.exports = app => app.use('/book', router)