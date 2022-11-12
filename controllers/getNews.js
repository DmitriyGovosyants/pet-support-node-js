
const { News } = require('../models')

const getNews = async (req, res) => {
    try {
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
        // 406 Not Acceptable, когда сервер не находит подходящего ответа в соответствии с запросом
        return res.status(406).json({
            status: 'success',
            data: null,
            message: 'Not found',
        })
    } catch (error) {
        console.error('Error getNews:', error.message)
    }
}

module.exports = getNews 