import { responseSend } from "../../config/response.js";
import sequelize from "../../models/connect.js";
import initModels from "../../models/init-models.js";
import { changeFormatDate, getUserId, messageError } from "../../utils/index.js";
import { isNotEmpty } from "../../utils/validation.js";


const model = initModels(sequelize)



const getInfoImage = async (req, res) => {
    let { hinhId } = req.params

    try {
        let data = await model.hinh_anh.findOne({
            where: {
                hinh_id: hinhId
            },
            include: {
                model: model.nguoi_dung,
                as: "nguoi_dung",
                attributes: ['nguoi_dung_id', 'email', 'ho_ten', 'tuoi', 'anh_dai_dien']
            }
        })
        if (!data) {
            return responseSend(res, "", "Không tìm thấy hình ảnh", 404);
        }

        let { hinh_id, ten_hinh, duong_dan, mo_ta, createdAt } = data
        let { nguoi_dung_id, email, ho_ten, tuoi, anh_dai_dien } = data.nguoi_dung

        const newData = {
            hinhId: hinh_id,
            tenHinh: ten_hinh,
            duongDan: duong_dan,
            moTa: mo_ta,
            nguoiTaoAnh: {
                nguoiDungId: nguoi_dung_id,
                email: email,
                hoTen: ho_ten,
                tuoi: tuoi,
                anhDaiDien: anh_dai_dien,
                ngayTao: changeFormatDate(createdAt)
            }
        };
        responseSend(res, newData, "Thành công!", 200)
    } catch (err) {
        messageError(res, err.message, 500)
    }
}


const getComment = async (req, res) => {
    let { hinhId } = req.params

    try {
        let comments = await model.binh_luan.findAll({
            where: {
                hinh_id: hinhId
            },
            include: {
                model: model.nguoi_dung,
                as: "nguoi_dung",
                attributes: ['email', 'ho_ten']
            }
        })

        if (!comments) {
            messageError(res, "Không có bình luận nào cho ảnh này", 404)
        }



        let listUserComment = []

        comments.forEach(comment => {
            let { noi_dung, ngay_binh_luan } = comment
            let { ho_ten, email } = comment.nguoi_dung
            listUserComment.push({
                hoTen: ho_ten,
                email,
                noiDungBinhLuan: noi_dung,
                ngayBinhLuan: changeFormatDate(ngay_binh_luan)
            })
        })


        const newData = {
            id: comments[0].hinh_id,
            danhSachBinhLuan: listUserComment
        }

        responseSend(res, newData, "Thành công!", 200)

    } catch (err) {
        messageError(res, err.message, 500)
    }

}

const getSaveImage = async (req, res) => {
    let userId = getUserId(req.headers)
    let { hinhId } = req.params

    if (userId) {
        try {
            let image = await model.luu_anh.findOne({
                where: {
                    hinh_id: hinhId
                },
                include: {
                    model: model.hinh_anh,
                    as: "hinh",
                    attributes: ['ten_hinh', 'mo_ta']
                }
            })
            if (image) {
                let { hinh_id, ngay_luu, nguoi_dung_id } = image
                if (nguoi_dung_id == userId) {
                    let { ten_hinh, mo_ta } = image.hinh
                    const data = {
                        hinhId: hinh_id,
                        tenHinh: ten_hinh,
                        moTa: mo_ta,
                        ngayLuu: changeFormatDate(ngay_luu),
                    }

                    return responseSend(res, data, "Ảnh đã lưu!", 200)
                } else {
                    return responseSend(res, '', "Ảnh chưa lưu", 404)
                }
            } else {
                return responseSend(res, '', "Không tìm thấy ảnh", 404)
            }
        } catch (err) {
            messageError(res, err.message, 500)
        }
    }
}


const saveComment = async (req, res) => {
    let { noiDung } = req.body
    let { hinhId } = req.params
    let userId = getUserId(req.headers)

    if (!isNotEmpty(noiDung)) {
        return messageError(res, "Nội dung không được để trống!", 403)
    }

    if (userId) {
        try {
            let newComment = await model.binh_luan.create({
                nguoi_dung_id: userId,
                hinh_id: hinhId,
                noi_dung: noiDung,
                ngay_binh_luan: new Date(),
            })
            let { hinh_id, ngay_binh_luan, noi_dung } = newComment

            let result = {
                hinhId: hinh_id,
                ngayBinhLuan: changeFormatDate(ngay_binh_luan),
                noiDung: noi_dung
            }
            responseSend(res, result, "Thành công!", 200)


        } catch (err) {
            messageError(res, err.message, 500)
        }

    }
}

export { getInfoImage, getComment, getSaveImage, saveComment }