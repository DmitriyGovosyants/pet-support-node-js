const express = require('express')
const router = express.Router()
const ctrlWrapper = require('../../helpers/ctrWrapper')

const { servicesController } = require('../../controllers')

router.get('/', ctrlWrapper(servicesController))

module.exports = { servicesRouter: router }