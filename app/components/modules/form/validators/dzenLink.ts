const dzenLinkRegex = 'https://dzen.ru/'

const dzenLinkValidator = (dzenLink: string) => {
  if (dzenLink) {
    if (!dzenLink.startsWith(dzenLinkRegex)) {
      return 'Неверная ссылка'
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export default dzenLinkValidator