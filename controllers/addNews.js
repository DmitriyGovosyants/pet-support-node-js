const { News } = require('../models')

const addNews = async (req, res) => {
    try {
        const D = new Date()
        const dateCreation = D.getDate() + "/" + (D.getMonth() + 1) + "/" + D.getFullYear()
        const { title, description } = req.body
        await News.create({ title: title, description: description, date: dateCreation })
        const body = { title: title, description: description, date: dateCreation }
        res.status(201).json(body)
    } catch (error) {
        console.log('addNews', error.message)
    }
}

module.exports = addNews