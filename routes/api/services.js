const express = require('express')
const router = express.Router()

const { getServices } = require('../../controllers')

router.get('/', getServices)

module.exports = { servicesRouter: router }