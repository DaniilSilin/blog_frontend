const usernameRegex = new RegExp('[a-zA-Z0-9_]{3,15}')

const usernameValidator = (username: string, isUsernameAvailable: string) => {
  if (!username) {
    return ''
  } else {
    if (!usernameRegex.test(username)) {
      return 'Минимальная длина: 3 символа. Имя пользователя может содержать Латинские символы, цифры и символ "_"'
    } else if (isUsernameAvailable === '123') {
      return 'Имя пользователя занято. Подумайте над другим именем.'
    } else {
      return ''
    }
  }
}

export default usernameValidator