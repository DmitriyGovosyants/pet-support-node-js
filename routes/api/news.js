const express = require('express')
const router = express.Router()
const { addNewsValidation } = require('../../middlewares')

// const { authUser, upload } = require('../../middlewares')
const { getNews, addNews } = require('../../controllers')


router.get('/', getNews)
router.post('/', addNewsValidation, addNews)

// router.patch('/avatars', authUser, upload.single('avatar'), updateAvatar


module.exports = { newsRouter: router }