const youtubeLinkRegex = 'https://www.youtube.com/'

const youtubeLinkValidator = (youtubeLink: string) => {
  if (youtubeLink) {
    if (!youtubeLink.startsWith(youtubeLinkRegex)) {
      return 'Неверная ссылка'
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export default youtubeLinkValidator