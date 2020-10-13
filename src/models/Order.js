const { mongo } = require('../database')
const mongoose = require('../database')

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

const Order = mongoose.model('Order', OrderSchema, 'Orders')

module.exports = Order