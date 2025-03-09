const telegramLinkRegex = 'https://t.me/'

const telegramLinkValidator = (telegramLink: string) => {
  if (telegramLink) {
    if (!telegramLink.startsWith(telegramLinkRegex)) {
      return 'Неверная ссылка'
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export default telegramLinkValidator