import CryptoJS from 'crypto-js';


const SECRET_KEY = 'mySecretKey';


const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};


const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};


export { encryptPassword, decryptPassword }