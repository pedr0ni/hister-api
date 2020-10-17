import mongoose from 'mongoose'
import Environment from '../environment'

Environment.load()
const string = `mongodb+srv://root:66ve1t9t1qoKEDRh@violaveiculos.f3jfi.gcp.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

mongoose.connect(string, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

export default mongoose