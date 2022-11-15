const { Services } = require('../models')

const getServices = async (req, res, next) => {

    const services = await Services.find({}, null, {})

    if (services.length !== 0) {
        return res.json({
            code: 200,
            status: 'success',
            data: services,
            message: 'Get services success',
        })
    }
    next()
}

module.exports = getServices 