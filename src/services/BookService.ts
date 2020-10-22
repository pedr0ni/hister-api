import { IOrderBook } from "../models/Order";
import { IBook } from "../models/Book";
import mongoose from "../database";

export default {

    toOrderBookArray(books: Array<IBook>): Array<IOrderBook> {
        return books.map(entry => {
            return {
                _id: entry._id,
                price: entry.price,
                title: entry.title
            }
        })
    },

    toOrderBook(book: IBook): IOrderBook {
        return {
            _id: mongoose.Types.ObjectId(book._id),
            price: book.price,
            title: book.title
        }
    }

}