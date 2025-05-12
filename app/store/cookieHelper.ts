import { getCookie, setCookie, deleteCookie } from "cookies-next";

class CookieHelper {
  static setCookie(cname: string, cvalue: string, exdays: number) {
    setCookie(cname, cvalue, {
      maxAge: exdays * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }

  static getCookie(cname: string) {
    return getCookie(cname);
  }

  static removeCookie(cname: string) {
    deleteCookie(cname);
  }
}

export default CookieHelper;
