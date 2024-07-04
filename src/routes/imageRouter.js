import express from 'express'
import { addImage, deleteImageCreate, getListImageCreate, getListImageSave, saveImage } from '../controllers/image/imageController.js'
import { verifyToken } from '../config/jwt.js'

const imageRouter = express.Router()


imageRouter.get('/get-list-image-save', verifyToken, getListImageSave)


imageRouter.get('/get-list-image-create', verifyToken, getListImageCreate)


imageRouter.delete('/delete-image-create/:hinhId', verifyToken, deleteImageCreate)


imageRouter.post('/add-image', verifyToken, addImage)


imageRouter.post('/save-image/:hinhId', verifyToken, saveImage)






export default imageRouter