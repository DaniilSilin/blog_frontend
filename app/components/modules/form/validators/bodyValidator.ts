const bodyValidator = (body: string) => {
  if (!body) {
    return 'Обязательное поле.'
  } else {
    return ''
  }
}

export default bodyValidator