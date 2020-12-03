import express from 'express'
import Book from '../models/Book'
import Category from '../models/Category'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'

const router = express.Router()

router.use(AuthenticationMiddleware)

interface IQuery {
    page: number,
    search?: string
}

// Metodo que lista todos os livros (GET /book)
router.get<any, any, any, IQuery>('/', async (req, res) => {
    try {
        let { page = 0, search } = req.query

        const skip = page * 10
    
        const take = 10
        const query = {
            title: {
                $regex: search
            }
        }
        const pages = Math.floor(search ? await Book.find(query).countDocuments() / take : await Book.countDocuments() / take)

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

// Metodo pra adicionar um livro (POST /book)
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body)

        return res.json(book)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para listar informacoes de um livro por id (GET /book/bookId)
router.get('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        if (bookId.length < 24) {
            return res.status(400).json({
                message: `${bookId} não pode ser convertido em ObjectID`
            })
        }
        
        const book = await Book.findById(bookId)

        if (!book)
            return res.status(404).json({
                error: `Book with id ${bookId} not found.`
            })

        return res.json(book)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

// Metodo para listar todos os livros de uma determinada categoria (GET /book/category/:category)
router.get<any, any, any, IQuery>('/category/:category', async (req, res) => {
    try {
        let { page = 0 } = req.query
        const category = await Category.findById(req.params.category)

        const skip = page * 10
        let totalResults = await Book.find({category}).countDocuments()
        const pages = Math.floor(totalResults / 10)

        const books = await Book
            .find({category})
            .skip(skip)
            .limit(10)
            .sort({
                title: 'asc'
            })
            .populate('category')

        return res.json({books, pagination: {
            page, pages, results: totalResults
        }})
    } catch (exception) {
        console.error(exception)
        return res.status(500).json(exception)
    }
})

// Metodo para remover um livro por id
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

export default router