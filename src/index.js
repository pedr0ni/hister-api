const express      = require('express')
const consign      = require('consign')
const cors         = require('cors')
const compression  = require('compression')
const helmet       = require('helmet')
const database     = require('./database')

const app = express()

// Initialize compress extensions
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cors())

// Include controllers folder
consign()
    .include('src/controllers')
    .into(app)

// Start application 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[API] Listening on port ${port}`)
})

module.exports = app