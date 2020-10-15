const mongoose = require('../database')

const CategorySchema = new mongoose.Schema({
    index: {
        type: Number,
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Category = mongoose.model('Category', CategorySchema, 'Categories')

module.exports = Category