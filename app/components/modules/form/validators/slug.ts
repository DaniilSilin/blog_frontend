const slugRegex = new RegExp("^[a-zA-Z0-9_]+$");

const slugValidator = (slug: string, slug2: any) => {
  if (!slug) {
    return "";
  } else {
    if (!slugRegex.test(slug)) {
      return "Ссылка на сайт может содержать латинские буквы, цифры и знак нижнего подчёркивания.";
    } else if (slug2?.available === false) {
      return "Этот адрес уже занят";
    } else {
      return "";
    }
  }
};

export default slugValidator;
