import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import { FaArrowLeft } from "react-icons/fa";

import styles from "./switch_theme_menu.module.css";

export interface Props {
  currentTheme: string;
  setCurrentTheme: (value: string) => void;
  setCurrenThemeLabel: (value: string) => void;
  setDisplaySwitchThemeMenu: (value: boolean) => void;
}

const themeList = [
  {
    id: 1,
    label: "Тёмная",
    theme: "dark",
  },
  {
    id: 2,
    label: "Светлая",
    theme: "light",
  },
];

export default function SwitchThemeMenu({
  setDisplaySwitchThemeMenu,
  setCurrenThemeLabel,
  setCurrentTheme,
  currentTheme,
}: Props) {
  const themeSwitchHandleChange = React.useCallback(
    (theme: any) => {
      CookieHelper.setCookie("theme", theme.theme, 365);
      setCurrentTheme(theme.theme);
      if (theme.theme === "dark") {
        document.body.setAttribute("dark-theme", "dark");
        setCurrenThemeLabel("тёмная");
      } else {
        document.body.removeAttribute("dark-theme");
        setCurrenThemeLabel("светлая");
      }
    },
    [setCurrentTheme, setCurrenThemeLabel],
  );

  return (
    <div className={styles.root}>
      <div
        className={styles.header}
        onClick={() => setDisplaySwitchThemeMenu(false)}
      >
        <button>
          <FaArrowLeft size={24} />
        </button>
        <div>Тема</div>
      </div>
      <div className={styles.description}>
        Настройка будет применена только в этом браузере.
      </div>
      <div>
        {themeList.map((item: any, index: number) => (
          <div
            style={{ display: "flex" }}
            key={index}
            onClick={() => themeSwitchHandleChange(item)}
          >
            {currentTheme === item.theme && <div>check</div>}
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
