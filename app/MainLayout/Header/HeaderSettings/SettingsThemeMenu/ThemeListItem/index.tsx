import React from "react";
import CookieHelper from "@/app/store/cookieHelper";
import { IoIosCheckmark } from "react-icons/io";

import styles from "./theme_list_item.module.css";

export interface Props {
  currentTheme: string;
  themeListItem: Record<string, any>;
  setCurrentTheme: (value: string) => void;
}

export default function ThemeListItem({
  currentTheme,
  themeListItem,
  setCurrentTheme,
}: Props) {
  const themeSwitchHandleChange = React.useCallback(() => {
    const menuItemTheme = themeListItem.theme;
    CookieHelper.setCookie("theme", menuItemTheme, 365);
    if (menuItemTheme === "dark") {
      document.body.setAttribute("dark-theme", "dark");
      setCurrentTheme("dark");
    } else {
      document.body.removeAttribute("dark-theme");
      setCurrentTheme("light");
    }
  }, []);

  return (
    <button className={styles.themeItem} onClick={themeSwitchHandleChange}>
      {currentTheme === themeListItem.theme ? (
        <>
          <IoIosCheckmark size={30} />
          <div>{themeListItem.label}</div>
        </>
      ) : (
        <div className={styles.themeItemLabel}>{themeListItem.label}</div>
      )}
    </button>
  );
}
