const express = require('express')
const router = express.Router()
const ctrlWrapper = require('../../helpers/ctrWrapper')

const { newsController } = require('../../controllers')

router.get('/', ctrlWrapper(newsController))

module.exports = { newsRouter: router }