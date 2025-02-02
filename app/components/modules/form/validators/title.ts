const titleValidator = (title: string) => {
  if (!title) {
    return 'Обязательное поле.'
  } else {
    return ''
  }
}

export default titleValidator