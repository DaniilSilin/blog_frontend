const emailRegex = new RegExp('.+@.+')

const emailValidator = (email: string) => {
  if (!email) {
    return ''
  } else {
    if (!emailRegex.test(email)) {
      return 'Неверный email. Проверьте правильность указанного адреса. '
    } else {
      return ''
    }
  }
}

export default emailValidator