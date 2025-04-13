const passwordRegex = new RegExp("[a-zA-Z0-9_]{3,15}");

const passwordValidator = (password: string) => {
  if (!password) {
    return "";
  } else {
    if (!passwordRegex.test(password)) {
      return "Минимальная длина: 6 символов. Ваш пароль должен содержать латинские в верхнем и нижнем регистре и цифры";
    } else {
      return "";
    }
  }
};

export default passwordValidator;
