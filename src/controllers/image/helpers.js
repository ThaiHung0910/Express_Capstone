import { changeFormatDate, messageError } from "../../utils/index.js";




const getUserImagesCreate = async (res, model, userId) => {
    try {
        let images = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id: userId
            },
            include: {
                model: model.nguoi_dung,
                as: "nguoi_dung",
                attributes: ["ho_ten", "email"]
            }
        });

        if (images.length) {
            let { ho_ten, email } = images[0].nguoi_dung;

            let danhSachAnhTao = images.map(image => {
                let { hinh_id, ten_hinh, mo_ta, createdAt } = image;

                return {
                    hinhId: hinh_id,
                    tenHinh: ten_hinh,
                    moTa: mo_ta,
                    ngayTao: changeFormatDate(createdAt)
                };
            });

            return {
                id: images[0].nguoi_dung_id,
                ten: ho_ten,
                email,
                danhSachAnhTao
            };
        } else {
            return messageError(res, "Chưa tạo ảnh nào", 404)
        }
    } catch (err) {
        return messageError(res, err.message, 500)
    }
};

const getUserImageSave = async (res, model, userId) => {
    try {
        let images = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id: userId
            },
            include: [{
                model: model.nguoi_dung,
                as: "nguoi_dung",
                attributes: ["ho_ten", "email"]
            }, { model: model.hinh_anh, as: "hinh", attributes: ["ten_hinh", "mo_ta"] }]
        });

        if (images.length) {
            let { ho_ten, email } = images[0].nguoi_dung;

            let danhSachAnhLuu = images.map(image => {
                let { hinh_id, ngay_luu } = image;
                let { ten_hinh, mo_ta } = image.hinh

                return {
                    hinhId: hinh_id,
                    tenHinh: ten_hinh,
                    moTa: mo_ta,
                    ngayLuu: changeFormatDate(ngay_luu)
                };
            });

            return {
                id: images[0].nguoi_dung_id,
                ten: ho_ten,
                email,
                danhSachAnhLuu
            };
        } else {
            return messageError(res, "Chưa lưu ảnh nào", 404)
        }
    } catch (err) {
        return messageError(res, err.message, 500)
    }
}


export { getUserImagesCreate, getUserImageSave }