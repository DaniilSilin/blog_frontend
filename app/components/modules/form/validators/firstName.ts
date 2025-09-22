const firstNameRegex = new RegExp("^[a-zA-Zа-яА-Я-]{2,50}$");

const firstNameValidator = (firstName: string) => {
  if (!firstName) {
    return "";
  } else {
    // @ts-ignore
    if (firstName.length < 2) {
      return "Имя слишком короткое";
    } else if (!firstNameRegex.test(firstName)) {
      return "Минимальная длина: 2 символа. Ваше имя должно содержать буквы в верхнем или нижнем регистре.";
    } else {
      return "";
    }
  }
};

export default firstNameValidator;
