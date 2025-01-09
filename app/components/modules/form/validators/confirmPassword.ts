const confirmPasswordValidator = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return ''
  } else {
    if (confirmPassword === password && password) {
      return ''
    } else {
      return 'Пароли не совпадают'
    }
  }
}

export default confirmPasswordValidator