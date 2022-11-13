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
    return res.status(404).json({
        status: 'success',
        message: 'Not found',
    })
}

module.exports = getServices 