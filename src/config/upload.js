import multer, { diskStorage } from 'multer'
export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => {

            let date = new Date()
            callback(null, `${date.getTime()}_${file.originalname}`)
        }
    })
})




