import express from 'express'
import userRouter from './userRouter.js'
import homeRouter from './homeRouter.js'
import detailRouter from './detailRouter.js'
import imageRouter from './imageRouter.js'


const rootRouter = express.Router()

rootRouter.use('/user', userRouter)
rootRouter.use('/home', homeRouter)
rootRouter.use('/detail', detailRouter)
rootRouter.use('/image', imageRouter)



export default rootRouter