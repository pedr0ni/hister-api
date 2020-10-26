import mongoose from '../database'
import { ICategory } from './Category'

export interface IBook extends mongoose.Document {
    title: string,
    authors: string,
    average_rating: number,
    isbn: string,
    isbn13: string,
    language_code: string,
    num_pages: number,
    ratings_count: number,
    text_reviews_count: number,
    publication_date: number,
    publisher: string,
    price: number,
    category: ICategory['_id'],
    createdAt?: Date
}

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

export default mongoose.model<IBook>('Book', BookSchema, 'Books')