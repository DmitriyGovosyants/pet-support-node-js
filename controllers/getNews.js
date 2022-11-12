
const { News } = require('../models')

const getNews = async (req, res) => {
    try {
        let { title = /./ } = req.query

        const result = (title === /./) ? title : title = new RegExp(title, 'i')
        const allNews = await News.find({ title: result }, null, {})

        console.log(allNews)
        if (allNews.length !== 0) {
            console.log(allNews)
            return res.status(200).json(allNews)
        }
        return res.json('нет новостей') // !отправить null для фронта
    } catch (error) {
        console.error('ERROR listNews:', error.message)
    }
}


module.exports = getNews 