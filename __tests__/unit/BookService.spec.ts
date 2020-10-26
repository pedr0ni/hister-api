import Factory from '../../src/Factory'
import { IBook } from '../../src/models/Book'
import { IOrderBook } from '../../src/models/Order'
import BookService from '../../src/services/BookService'

describe('BookService', () => {

    it('Should convert a book to a order book', async () => {
        let book: IBook | IOrderBook = await Factory.getBook()

        book = BookService.toOrderBook(book as IBook)

        expect(book).not.toHaveProperty('language_code')
    })

    it('Should convert a array of book to array of order book', async () => {
        let book: Array<IBook> | Array<IOrderBook> = [await Factory.getBook(), await Factory.getBook(), await Factory.getBook()]

        book = BookService.toOrderBookArray(book as Array<IBook>)

        book.forEach(async entry => {
            expect(book).not.toHaveProperty('language_code')
        })
    })

    afterAll(async () => {
        await Factory.destroy()
    })

})