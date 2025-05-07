const slugRegex = new RegExp("^[a-zA-Z0-9_]+$");

const slugValidator = (slug: string, slug2: string) => {
  if (!slug) {
    return "";
  } else {
    if (!slugRegex.test(slug)) {
      return "Ссылка на сайт может содержать латинские буквы, цифры и знак нижнего подчёркивания.";
    } else if (slug2 === "Этот адрес уже занят") {
      return "Этот адрес уже занят";
    } else {
      return "";
    }
  }
};

export default slugValidator;
