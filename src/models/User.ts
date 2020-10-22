import mongoose from '../database'
import bcrypt from 'bcrypt'
import { IOrderBook } from './Order'

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    birth: string,
    password: string,
    credit: number,
    toOrderBook(): IOrderBook
    cart: Array<IOrderBook>
    createdAt?: Date
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birth: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    credit: {
        type: Number,
        require: true
    },
    cart: {
        type: Array,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre<IUser>('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

export default mongoose.model<IUser>('User', UserSchema, 'Users')