import sequelize from "../../models/connect.js";
import initModels from "../../models/init-models.js";
import { responseSend } from "../../config/response.js";
import { changeFormatDate, getUserId, messageError } from "../../utils/index.js";
import { getUserImageSave, getUserImagesCreate } from "./helpers.js";
import { validationImage } from "../../utils/validation.js";


const model = initModels(sequelize)



const getListImageSave = async (req, res) => {
    let userId = getUserId(req.headers)

    if (userId) {
        try {
            let images = await model.luu_anh.findAll({
                where: {
                    nguoi_dung_id: userId
                },
                include: [{
                    model: model.nguoi_dung,
                    as: "nguoi_dung",
                    attributes: ["ho_ten", "email"]
                },
                {
                    model: model.hinh_anh,
                    as: "hinh",
                    attributes: ["ten_hinh", "mo_ta", "duong_dan"]
                }]
            })


            if (images.length) {

                let { ho_ten, email } = images[0].nguoi_dung

                let danhSachAnhLuu = images.map(image => {
                    let { ngay_luu, hinh_id } = image
                    let { ten_hinh, mo_ta } = image.hinh

                    return {
                        hinhId: hinh_id,
                        tenHinh: ten_hinh,
                        moTa: mo_ta,
                        ngayLuu: changeFormatDate(ngay_luu)
                    }
                })

                let result = {
                    id: images[0].nguoi_dung_id,
                    ten: ho_ten,
                    email,
                    danhSachAnhLuu
                }

                responseSend(res, result, "Thành công!", 200)
            } else {
                return messageError(res, 'Chưa lưu ảnh nào', 404)
            }
        } catch (err) {
            messageError(res, err.message, 500)
        }
    } else {
        messageError(res, 'User không tồn tại', 400);
    }
}

const getListImageCreate = async (req, res) => {
    let userId = getUserId(req.headers)

    if (userId) {
        try {
            let result = await getUserImagesCreate(res, model, userId);
            responseSend(res, result, "Thành công!", 200);
        } catch (err) {
            messageError(res, err.message, 404);
        }
    } else {
        messageError(res, 'User không tồn tại', 400);
    }
}

const deleteImageCreate = async (req, res) => {
    let userId = getUserId(req.headers)
    let { hinhId } = req.params

    if (userId) {
        try {
            let images = await getUserImagesCreate(res, model, userId)



            let isImageCreate = false

            images.danhSachAnhTao.forEach(image => {
                if (image.hinhId == hinhId) {
                    isImageCreate = true
                }
            })

            if (!isImageCreate) {
                return responseSend(res, '', "Unauthorized!", 403)
            }

            let imageCreate = await model.hinh_anh.findOne({
                where: {
                    hinh_id: hinhId,
                    nguoi_dung_id: userId
                }
            })

            await imageCreate.destroy()

            responseSend(res, '', "Xóa ảnh thành công!", 200)
        } catch (err) {
            messageError(res, err.message, 500)
        }
    } else {
        messageError(res, 'User không tồn tại', 400);
    }


}


const addImage = async (req, res) => {
    let userId = getUserId(req.headers)
    let { tenHinh, duongDan, moTa } = req.body

    let validationError = validationImage(req.body)

    if (validationError) {
        return messageError(res, validationError, 403);
    }

    if (userId) {
        let newImage = {
            ten_hinh: tenHinh,
            duong_dan: duongDan,
            mo_ta: moTa,
            nguoi_dung_id: userId
        }

        try {
            await model.hinh_anh.create(newImage)
            responseSend(res, "", "Tạo ảnh thành công!", 200)
        } catch (err) {
            messageError(res, err.message, 500)
        }
    } else {
        messageError(res, 'User không tồn tại', 400);
    }
}


const saveImage = async (req, res) => {
    let userId = getUserId(req.headers)
    let { hinhId } = req.params

    if (userId) {
        let images = await getUserImageSave(res, model, userId)

        console.log(images)

        let isImageSave = false

        images.danhSachAnhLuu.forEach(image => {
            if (image.hinhId == hinhId) {
                isImageSave = true
            }
        })

        if (isImageSave) {
            return messageError(res, "Ảnh đã được lưu!", 403)
        }

        let imageSave = {
            nguoi_dung_id: userId,
            hinh_id: hinhId,
            ngay_luu: new Date()
        }



        try {
            await model.luu_anh.create(imageSave)

            responseSend(res, "", "Lưu ảnh thành công!", 200)
        } catch (err) {
            messageError(res, err.message, 500)
        }

    } else {
        messageError(res, 'User không tồn tại', 400);
    }
}



export { getListImageSave, getListImageCreate, deleteImageCreate, addImage, saveImage }
