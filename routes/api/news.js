const express = require('express')
const router = express.Router()

const { getNews } = require('../../controllers')

router.get('/', getNews)

module.exports = { newsRouter: router }