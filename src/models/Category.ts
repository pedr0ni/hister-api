import mongoose from '../database'

export interface ICategory extends mongoose.Document {
    index: number,
    name: string,
    image: string,
    createdAt: Date
}

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

const Category = mongoose.model<ICategory>('Category', CategorySchema, 'Categories')

export default Category