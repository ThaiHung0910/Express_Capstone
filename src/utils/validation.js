const isNotEmpty = (value) => {
  value = String(value)
  return value && value.trim().length > 0;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 4;
};

const isValidName = (name) => {
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  return nameRegex.test(name);
};

const isValidAge = (value) => {
  value = Number(value)
  return Number.isInteger(value) && value > 0;
};

const isValidURL = (url) => {
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/;
  return urlRegex.test(url);
};


const validationUser = (data, type) => {
  const { email, matKhau, hoTen, tuoi } = data;

  if (type === "signup") {
    if (
      !isNotEmpty(email)) {
      return "Dữ liệu không được để trống";
    }

    if (!isValidEmail(email)) {
      return "Email không hợp lệ";
    }
  }

  if (
    !isNotEmpty(matKhau) ||
    !isNotEmpty(hoTen) ||
    !isNotEmpty(tuoi)
  ) {
    return "Dữ liệu không được để trống";
  }

  if (!isValidPassword(matKhau)) {
    return "Mật khẩu phải có ít nhất 4 ký tự";
  }

  if (!isValidName(hoTen)) {
    return "Họ tên chỉ nhập chữ";
  }

  if (!isValidAge(tuoi)) {
    return "Dữ liệu tuổi không hợp lệ";
  }

  return null
}


const validationImage = (data) => {
  let { tenHinh, duongDan, moTa } = data

  if (!isNotEmpty(tenHinh) || !isNotEmpty(duongDan) || !isNotEmpty(moTa)) {
    return "Dữ liệu không được để trống"
  }

  if (!isValidURL(duongDan)) {
    return "Đường dẫn không đúng định dạng"
  }

  return null
}





export { isNotEmpty, validationUser, validationImage };
