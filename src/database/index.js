const config    = require('./config')
const Sequelize = require('sequelize')

const database = new Sequelize(config)

const User     = require('../models/User')

User.init(database)

module.exports = database