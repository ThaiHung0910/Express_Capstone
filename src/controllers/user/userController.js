import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { responseSend } from "../../config/response.js";
import { checkToken, checkTokenRef, createToken, createTokenRef, decodeToken } from "../../config/jwt.js";
import { isNotEmpty, validationUser } from "../../utils/validation.js";
import { changeFormatDate, generateRandomString, getUserId, messageError } from "../../utils/index.js";
import { decryptPassword, encryptPassword } from "../../utils/password.js";





const model = initModels(sequelize);

const signUp = async (req, res) => {
  let { email, matKhau, hoTen, tuoi } = req.body;

  const validationError = validationUser(req.body, "signup");

  if (validationError) {
    return messageError(res, validationError, 403);
  }

  let duplicateEmail = await model.nguoi_dung.findOne({
    where: {
      email,
    },
  });

  if (duplicateEmail) {
    return responseSend(res, "", "Email đã tồn tại!", 403);
  }

  let newUser = {
    email,
    mat_khau: encryptPassword(matKhau),
    ho_ten: hoTen,
    tuoi,
    anh_dai_dien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXXlfr_MlkLRfi83hy40nm4j4aq_JSF7-ucw&s",
    pass_encrypted: true
  };

  let { mat_khau, pass_encrypted, ...result } = newUser;
  try {
    await model.nguoi_dung.create(newUser);
    responseSend(res, result, "Thành công!", 200);
  } catch (err) {
    messageError(res, err.message, 500)
  }
};



const login = async (req, res) => {
  let { email, matKhau } = req.body;

  if (!isNotEmpty(email) || !isNotEmpty(matKhau)) {
    return responseSend(res, "", "Dữ liệu không được để trống", 403);
  }

  try {
    let user = await model.nguoi_dung.findOne({
      where: { email }
    });

    if (!user) {
      return responseSend(res, "", "Email không tồn tại", 403);
    }

    let isMatch = false;
    let { nguoi_dung_id, pass_encrypted, mat_khau } = user

    if (pass_encrypted) {
      isMatch = matKhau === decryptPassword(mat_khau);
    } else {
      isMatch = matKhau === mat_khau;
    }


    if (isMatch) {
      if (!pass_encrypted) {
        await user.update({ mat_khau: encryptPassword(matKhau), pass_encrypted: true });
      }

      let key = generateRandomString(6)

      let valueToken = {
        nguoiDungId: nguoi_dung_id,
        key
      }

      let token = createToken(valueToken);

      let tokenRef = createTokenRef(valueToken);

      await user.update({ nguoi_dung_id, refresh_token: tokenRef })



      console.log(decodeToken(token));

      responseSend(res, { accessToken: token }, "Thành công!", 200);
    } else {
      responseSend(res, "", "Sai mật khẩu ", 403);
    }

  } catch (err) {
    messageError(res, err.message, 500)
  }
};


const getInfoUser = async (req, res) => {

  let userId = getUserId(req.headers)

  if (userId) {
    try {
      let infoUser = await model.nguoi_dung.findByPk(userId)

      if (!infoUser) {
        return responseSend(res, '', "Không tìm thấy người dùng", 404)
      }

      let { nguoi_dung_id, ho_ten, tuoi, email, anh_dai_dien, mat_khau, pass_encrypted, createdAt } = infoUser

      if (pass_encrypted) {
        mat_khau = decryptPassword(mat_khau)
      }

      let result = {
        id: nguoi_dung_id,
        hoTen: ho_ten,
        tuoi,
        email,
        matKhau: mat_khau,
        anhDaiDien: anh_dai_dien,
        ngayTao: changeFormatDate(createdAt)
      }

      responseSend(res, result, "Thành công!", 200)
    } catch (err) {
      messageError(res, err.message, 500)
    }
  } else {
    messageError(res, 'Người dùng không tồn tại', 400);
  }
}


const updateUser = async (req, res) => {
  let userId = getUserId(req.headers)
  let { matKhau, hoTen, tuoi } = req.body

  const validationError = validationUser(req.body, "update")

  if (validationError) {
    return messageError(res, validationError, 403);
  }

  if (userId) {
    let user = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id: userId }
    });

    if (!user) {
      return responseSend(res, "", "Người dùng không tồn tại", 403);
    }



    let newData = {
      mat_khau: encryptPassword(matKhau),
      ho_ten: hoTen,
      tuoi,
      pass_encrypted: true
    }

    try {
      await user.update({ ...user, ...newData })
      responseSend(res, "", "Cập nhật thành công!", 200)
    } catch (err) {
      messageError(res, err.message, 500);
    }
  } else {
    messageError(res, 'Người dùng không tồn tại', 400);
  }
}

const uploadAvatar = async (req, res) => {

  let file = req.file
  let userId = getUserId(req.headers)

  console.log(userId)

  if (!file) {
    return responseSend(res, "", "No file uploaded", 400);
  }
  try {

    let updatedUser = await model.nguoi_dung.update(
      { anh_dai_dien: `${file.filename}` },
      { where: { nguoi_dung_id: userId } }
    );

    if (updatedUser[0] === 0) {
      return responseSend(res, "", "User not found", 404);
    }

    responseSend(res, { filePath: `/public/img/${file.filename}` }, "Thành công!", 200);
  } catch (err) {
    messageError(res, err.message, 500)
  }

}


const resetToken = async (req, res) => {
  let { token } = req.headers;

  let errorToken = checkToken(token);

  if (errorToken != null && errorToken.name != "TokenExpiredError") {
    responseSend(res, "", "Not Authorized", 401);
    return;
  }

  let { data } = decodeToken(token);

  let getUser = await model.nguoi_dung.findByPk(data.nguoiDungId);

  let { nguoi_dung_id, refresh_token } = getUser.dataValues

  let tokenRef = decodeToken(refresh_token);
  let { key } = tokenRef.data

  if (checkTokenRef(refresh_token) != null) {
    responseSend(res, "", "Not Authorized", 401);
    return;
  }

  if (data.key != key) {
    responseSend(res, "", "Not Authorized", 401);
    return;
  }


  let tokenNew = createToken({
    nguoiDungId: nguoi_dung_id,
    key,
  });

  responseSend(res, tokenNew, "", 200);
};

export { signUp, login, getInfoUser, updateUser, uploadAvatar, resetToken };
