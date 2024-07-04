import express from 'express'
import { getImage, getListImage } from '../controllers/home/homeController.js'
import { verifyToken } from '../config/jwt.js'

const homeRouter = express.Router()



homeRouter.get('/get-list-image', verifyToken, getListImage)
homeRouter.get('/get-image-search', verifyToken, getImage)



export default homeRouter