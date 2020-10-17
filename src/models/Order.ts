import mongoose from '../database'
import { IBook } from './Book'
import { IUser } from './User'

export interface IOrderBook {
    _id: IBook['_id']
    title: string,
    price: number
}

export interface IOrder extends mongoose.Document {
    user: IUser['_id'],
    books: Array<IOrderBook>,
    totalPrice: number,
    status: string
}

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    books: {
        type: Array,
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IOrder>('Order', OrderSchema, 'Orders')