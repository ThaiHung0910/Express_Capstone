import { responseSend } from "../../config/response.js";
import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { Op } from 'sequelize';
import { changeFormatDate, messageError } from "../../utils/index.js";



const model = initModels(sequelize);

const createNewData = (data) => data.map((item) => {
  let { hinh_id, ten_hinh, duong_dan, mo_ta, nguoi_dung_id, createdAt } = item
  let { ho_ten, tuoi, email } = item.nguoi_dung
  return {
    id: hinh_id,
    tenHinh: ten_hinh,
    moTa: mo_ta,
    duongDan: duong_dan,
    nguoiTaoAnh: {
      id: nguoi_dung_id,
      ten: ho_ten,
      tuoi,
      email,
      ngayTao: changeFormatDate(createdAt)
    }
  }
})



const getListImage = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll({
      include:
      {
        model: model.nguoi_dung,
        as: "nguoi_dung",
        attributes: ["ho_ten", "email", "tuoi"]
      }
    });

    let newData = createNewData(data)

    responseSend(res, newData, "Thành công!", 200);
  } catch (err) {
    messageError(res, err.message, 500)
  }
};

const getImage = async (req, res) => {
  let { tenHinh } = req.query;

  try {
    let data = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${tenHinh.trim()}%`,
        },
      },
      include:
      {
        model: model.nguoi_dung,
        as: "nguoi_dung",
        attributes: ["ho_ten", "email", "tuoi"]
      }
    });

    if (!data.length) {
      return responseSend(res, "", "Không tìm thấy hình ảnh phù hợp với từ khóa của bạn!", 404);
    }

    let newData = createNewData(data)


    responseSend(res, newData, "Thành công!", 200);
  } catch (err) {
    messageError(res, err.message, 500)
  }
};

export { getListImage, getImage };
