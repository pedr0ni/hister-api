import faker from 'faker'
import Category from '../src/models/Category'
import User, { IUser } from '../src/models/User'
import app from '../src/app'
import { IOrderBook } from './models/Order'
import Book from './models/Book'

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
    async getBook() {
        return await Book.create({
            title: faker.random.words(),
            authors: faker.name.findName(),
            average_rating: faker.random.number(),
            isbn: faker.random.number().toString(),
            isbn13: faker.random.number().toString(),
            category: null,
            language_code: faker.random.locale(),
            num_pages: faker.random.number(),
            price: faker.random.number(),
            publication_date: faker.date.past().toString(),
            publisher: faker.name.findName(),
            ratings_count: faker.random.number(),
            text_reviews_count: faker.random.number(),
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