import jwt from "jsonwebtoken";
import { responseSend } from "./response.js";


const SECRET_KEY = "BI_MAT"
const SECRET_KEY_REF = "BI_MAT_REF"


const createToken = (data) => jwt.sign({ data }, SECRET_KEY, { expiresIn: "7d" });

const createTokenRef = data => jwt.sign({ data }, SECRET_KEY_REF, { expiresIn: "14d" })

const checkToken = (token) => jwt.verify(token, SECRET_KEY, (err) => err);

const checkTokenRef = token => jwt.verify(token, SECRET_KEY_REF, err => err)

const decodeToken = (token) => jwt.decode(token);

const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  let error = checkToken(token);

  console.log(error)
  if (error == null) {
    next();
    return;
  }
  responseSend(res, "", error.name, 401)
};



export { createToken, checkToken, decodeToken, verifyToken, createTokenRef, checkTokenRef };
