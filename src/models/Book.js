const mongoose = require('../database')

const BookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    authors: {
        type: String
    },
    average_rating: {
        type: Number
    },
    isbn: {
        type: String
    },
    isbn13: {
        type: String
    },
    language_code: {
        type: String
    },
    num_pages: {
        type: Number
    },
    ratings_count: {
        type: Number
    },
    text_reviews_count: {
        type: Number
    },
    publication_date: {
        type: String
    },
    publisher: {
        type: String
    },
    price: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Book = mongoose.model('Book', BookSchema, 'Books')

module.exports = Book