import { IOrderBook } from "../models/Order";
import { IBook } from "../models/Book";
import mongoose from "../database";

export default {

    toOrderBookArray(books: Array<IBook>): Array<IOrderBook> {
        return books.map(entry => {
            return {
                _id: entry._id,
                price: entry.price,
                authors: entry.authors,
                publisher: entry.publisher,
                title: entry.title
            }
        })
    },

    toOrderBook(book: IBook): IOrderBook {
        return {
            _id: mongoose.Types.ObjectId(book._id),
            price: book.price,
            title: book.title,
            authors: book.authors,
            publisher: book.publisher
        }
    }

}