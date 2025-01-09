const emailRegex = new RegExp('.+@.+')

const emailValidator = (email: string) => {
  if (!email) {
    return ''
  } else {
    if (email.length <= 3) {
      return 'Минимальная длина должна быть не меньше 4 символов'
    } else if (!emailRegex.test(email)) {
      return 'E-mail содержать недопустимые символы'
    } else {
      return ''
    }
  }
}

export default emailValidator