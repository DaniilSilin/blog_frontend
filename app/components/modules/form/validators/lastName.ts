const lastNameRegex = new RegExp('[a-zA-Zа-яА-Я-]{2,50}')

const lastNameValidator = (lastName: string) => {
  if (!lastName) {
    return ''
  } else {
    if (!lastNameRegex.test(lastName)) {
      return 'Имя содержит недопустимые символы'
    } else {
      return ''
    }
  }
}

export default lastNameValidator