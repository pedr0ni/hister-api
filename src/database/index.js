const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:66ve1t9t1qoKEDRh@violaveiculos.f3jfi.gcp.mongodb.net/Hister?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

module.exports = mongoose