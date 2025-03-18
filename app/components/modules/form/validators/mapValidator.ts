const mapRegex = new RegExp("");

const yandexSubstringIframe = "https://yandex.ru/map-widget/v1/?um=constructor";
const yandexSubstringLinkTag = "https://yandex.ru/maps/?um=constructor";

const mapValidator = (map: string) => {
  if (map) {
    if (
      map.includes(yandexSubstringIframe) ||
      map.includes(yandexSubstringLinkTag)
    ) {
      return "";
    } else {
      return "Неверная ссылка на карту";
    }
  } else {
    return "";
  }
};

export default mapValidator;
