import express from 'express'
import { getComment, getInfoImage, getSaveImage, saveComment } from '../controllers/detail/detailController.js'
import { verifyToken } from '../config/jwt.js'

const detailRouter = express.Router()


detailRouter.get('/get-info-image/:hinhId', getInfoImage)

detailRouter.get('/get-comment/:hinhId', getComment)

detailRouter.get('/get-image-save/:hinhId', getSaveImage)

detailRouter.post('/save-comment/:hinhId', saveComment)




export default detailRouter