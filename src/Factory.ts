import faker from 'faker'
import Category from '../src/models/Category'
import User, { IUser } from '../src/models/User'
import app from '../src/app'
import { IOrderBook } from './models/Order'

export interface IUserParms {
    name?: string,
    email?: string,
    birth?: string,
    cart?: Array<IOrderBook>,
    password?: string
}

export default {
    async getUser(params: IUserParms = {}) {
        return await User.create({
            name: params.name ?? faker.name.findName(),
            email: params.email ?? faker.internet.email(),
            birth: params.birth ?? faker.date.past().toString(),
            password: params.password ?? faker.internet.password(),
            cart: params.cart ?? [],
            credit: (Math.random() * 500).toFixed(2)
        })
    },
    getApp() {
        return app
    },
    async destroy() {
        console.log('[Factory] Bye...')
        await User.deleteMany({})
        await Category.deleteMany({})
        await app.prototype.disconnect()
        console.log('[Factory] Dead!')
    }
}