const { Services } = require('../models')

const getServices = async (req, res) => {
    try {

        const services = await Services.find({}, null, {})

        if (services.length !== 0) {
            console.log(services)
            return res.status(200).json({
                status: 'success',
                data: services,
                message: 'Get services success',
            })
        }
        return res.status(404).json({
            status: 'success',
            data: null,
            message: 'Not found',
        })
    } catch (error) {
        console.error('Error services:', error.message)
    }
}

module.exports = getServices 