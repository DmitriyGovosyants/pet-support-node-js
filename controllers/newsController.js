
const { News } = require('../models')

const newsController = async (req, res, next) => {
    let { title = /./ } = req.query

    const result = (title === /./) ? title : title = new RegExp(title, 'i')
    const allNews = await News.find({ title: result }, null, {})

    if (allNews.length !== 0) {

        return res.json({
            code:200,
            status: 'success',
            data: allNews,
            message: 'Get news success',
        })
    }
    next()
}

module.exports = newsController 