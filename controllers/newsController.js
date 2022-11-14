
const { News } = require('../models')

const newsController = async (req, res, next) => {
    let { title = /./ } = req.query

    const result = (title === /./) ? title : title = new RegExp(title, 'i')
    const allNews = await News.find({ title: result }, null, {})

    if (allNews.length !== 0) {
        console.log(allNews)
        return res.status(200).json({
            status: 'success',
            data: allNews,
            message: 'Get news success',
        })
    }
    next()
}

module.exports = newsController 