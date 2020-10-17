import mongoose from '../database'
import bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    birth: string,
    password: string,
    credit: number,
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