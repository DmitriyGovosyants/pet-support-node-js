const { Services } = require('../models')

const getServices = async (req, res, next) => {

    const services = await Services.find({}, null, {})

    if (services.length !== 0) {
        return res.status(200).json({
            status: 'success',
            data: services,
            message: 'Get services success',
        })
    }
    next()
}

module.exports = getServices 