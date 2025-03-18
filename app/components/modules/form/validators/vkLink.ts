const vkLinkRegex = "https://vk.com/";

const vkLinkValidator = (vkLink: string) => {
  if (vkLink) {
    if (!vkLink.startsWith(vkLinkRegex)) {
      return "Неверная ссылка";
    } else {
      return "";
    }
  } else {
    return "";
  }
};

export default vkLinkValidator;
