const express      = require('express')
const consign      = require('consign')
require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

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

module.exports = app