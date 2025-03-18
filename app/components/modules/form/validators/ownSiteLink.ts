const ownSiteRegex = "https://";

const ownSiteLinkValidator = (ownSiteLink: string) => {
  if (ownSiteLink) {
    if (!ownSiteLink.startsWith(ownSiteRegex)) {
      return "Неверная ссылка";
    } else {
      return "";
    }
  } else {
    return "";
  }
};

export default ownSiteLinkValidator;
