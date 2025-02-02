const slugRegex = new RegExp('[a-zA-Z0-9_]+')

const slugValidator = (slug: string) => {
  if (!slug) {
    return ''
  } else {
    if (!slugRegex.test(slug)) {
      return 'Ссылка на сайт может содержать латинские буквы, цифры и знак нижнего подчёркивания.'
    } else {
      return ''
    }
  }
}

export default slugValidator