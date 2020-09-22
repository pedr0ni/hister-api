const express = require('express')

const Category = require('../models/Category')

const router = express.Router()

router.use(require('../middlewares/AuthenticationMiddleware'))

router.get('/', async (req, res) => {
    const categories = await Category.find()

    return res.json(categories)
})

router.post('/', async (req, res) => {
    const category = await Category.create(req.body)

    return res.json(category)
})

module.exports = app => app.use('/category', router)