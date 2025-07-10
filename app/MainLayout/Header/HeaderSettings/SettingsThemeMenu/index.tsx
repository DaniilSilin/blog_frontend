import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import styles from "./settings_theme_menu.module.css";

export interface Props {
  setDisplayMenu: (value: boolean) => void;
  setCurrentTheme: (value: string) => void;
  setDisplayThemeMenu: (value: boolean) => void;
}

const themeList = [
  {
    id: 1,
    theme: "light",
    value: "Как на устройстве",
  },
  {
    id: 1,
    theme: "light",
    value: "Светлая",
  },
  {
    id: 2,
    theme: "dark",
    value: "Тёмная",
  },
];

export default function SettingsThemeMenu({
  setDisplayMenu,
  setCurrentTheme,
  setDisplayThemeMenu,
}: Props) {
  const themeSwitchHandleChange = React.useCallback(
    (theme: any) => {
      CookieHelper.setCookie("theme", theme, 365);
      setCurrentTheme(theme);
      if (theme === "dark") {
        document.body.setAttribute("dark-theme", "dark");
      } else {
        document.body.removeAttribute("dark-theme");
      }
    },
    [setCurrentTheme],
  );

  const returnToMenu = React.useCallback(() => {
    setDisplayThemeMenu(false);
    setDisplayMenu(true);
  }, [setDisplayThemeMenu, setDisplayMenu]);

  return (
    <div className={styles.root}>
      <div onClick={returnToMenu}>Назад</div>
      {themeList.map((item, index) => (
        <div key={index} onClick={() => themeSwitchHandleChange(item.theme)}>
          {item.value}
        </div>
      ))}
    </div>
  );
}
