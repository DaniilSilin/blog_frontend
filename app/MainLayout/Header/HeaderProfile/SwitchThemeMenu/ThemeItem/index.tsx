import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import { IoIosCheckmark } from "react-icons/io";

import styles from "./theme_item.module.css";

export interface Props {
  themeItem: Record<string, any>;
  setCurrentMenuThemeTitle: any;
  currentMenuThemeTitle: any;
}

export default function ThemeItem({
  themeItem,
  setCurrentMenuThemeTitle,
  currentMenuThemeTitle,
}: Props) {
  //
  const themeSwitchHandleChange = React.useCallback(() => {
    const menuItemTheme = themeItem.theme;
    CookieHelper.setCookie("theme", menuItemTheme, 365);
    if (currentMenuThemeTitle === "dark") {
      document.body.setAttribute("dark-theme", "dark");
      setCurrentMenuThemeTitle("тёмная");
    } else {
      document.body.removeAttribute("dark-theme");
      setCurrentMenuThemeTitle("светлая");
    }
  }, []);
  //
  return (
    <button className={styles.themeItem} onClick={themeSwitchHandleChange}>
      {currentMenuThemeTitle === themeItem.theme ? (
        <>
          <IoIosCheckmark size={30} className={styles.themeItemIcon} />
          <div>{themeItem.label}</div>
        </>
      ) : (
        <div className={styles.themeItemLabel}>{themeItem.label}</div>
      )}
    </button>
  );
}
