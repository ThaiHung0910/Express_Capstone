import express from 'express'
import { getInfoUser, login, resetToken, signUp, updateUser, uploadAvatar } from '../controllers/user/userController.js'
import { verifyToken } from '../config/jwt.js'
import { upload } from '../config/upload.js'


const userRouter = express.Router()

userRouter.post('/sign-up', signUp)
userRouter.post('/login', login)


userRouter.get('/get-info-user', verifyToken, getInfoUser)

userRouter.put('/update-user', verifyToken, updateUser)

userRouter.put('/upload-avatar', upload.single('hinhAnh'), uploadAvatar)

userRouter.post('/reset-token', resetToken)


export default userRouter



