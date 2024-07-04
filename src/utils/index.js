import { decodeToken } from "../config/jwt.js";
import { responseSend } from "../config/response.js";





const getUserId = (headers) => {
  let { token } = headers

  let { data } = decodeToken(token)
  if (data) {
    return data.nguoiDungId
  } else {
    return null
  }
}

const changeFormatDate = (value) => {
  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


const messageError = (res, err, code) => responseSend(res, "", err, code);

const generateRandomString = (number) => {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < number; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};



export { changeFormatDate, messageError, getUserId, generateRandomString };
