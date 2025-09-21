const usernameRegex = new RegExp("^[a-zA-Z0-9_]{3,15}$");

const usernameValidator = (
  username: string,
  isUsernameAvailable: Record<string, any>,
) => {
  if (!username) {
    return "";
  } else {
    if (usernameRegex.length < 3) {
      return "Слишком короткое имя пользователя.";
    } else if (!usernameRegex.test(username)) {
      return "Минимальная длина: 3 символа. Ваше имя пользователя может содержать латинские буквы, цифры и знак нижнего подчёркивания.";
    } else if (isUsernameAvailable.available === false) {
      return "Имя пользователя занято. Подумайте над другим именем.";
    } else {
      return "";
    }
  }
};

export default usernameValidator;
