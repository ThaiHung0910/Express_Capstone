import express from 'express'
import { getComment, getInfoImage, getSaveImage, saveComment } from '../controllers/detail/detailController.js'
import { verifyToken } from '../config/jwt.js'

const detailRouter = express.Router()


detailRouter.get('/get-info-image/:hinhId', verifyToken, getInfoImage)

detailRouter.get('/get-comment/:hinhId', verifyToken, getComment)

detailRouter.get('/get-image-save/:hinhId', verifyToken, getSaveImage)

detailRouter.post('/save-comment/:hinhId', verifyToken, saveComment)




export default detailRouter