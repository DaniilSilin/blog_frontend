import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import { FaArrowLeft } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

import styles from "./switch_theme.module.scss";

export interface Props {
  currentTheme: string;
  setCurrentTheme: (value: string) => void;
  setCurrenThemeLabel: (value: string) => void;
  setDisplaySwitchThemeMenu: (value: boolean) => void;
}

interface Theme {
  id: number;
  label: string;
  name: string;
}

const themeList: Theme[] = [
  {
    id: 1,
    label: "Тёмная",
    name: "dark",
  },
  {
    id: 2,
    label: "Светлая",
    name: "light",
  },
];

export default function SwitchThemeMenu({
  setDisplaySwitchThemeMenu,
  setCurrenThemeLabel,
  setCurrentTheme,
  currentTheme,
}: Props) {
  const themeSwitchHandleChange = React.useCallback(
    (theme: string) => {
      CookieHelper.setCookie("theme", theme, 365);
      setCurrentTheme(theme);
      if (theme === "dark") {
        document.body.setAttribute("dark-theme", "dark");
        setCurrenThemeLabel("тёмная");
      } else {
        document.body.removeAttribute("dark-theme");
        setCurrenThemeLabel("светлая");
      }
    },
    [setCurrentTheme, setCurrenThemeLabel],
  );

  const switchBackToMainMenu = () => {
    setDisplaySwitchThemeMenu(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button
          className={styles.backToMenuButton}
          onClick={switchBackToMainMenu}
        >
          <FaArrowLeft size={24} />
        </button>
        <div className={styles.themeLabel}>Тема</div>
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.description}>
          Настройка будет применена только в этом браузере.
        </div>
        <div>
          {themeList.map((theme: Theme) => (
            <button
              key={theme.id}
              className={styles.themeItem}
              onClick={() => themeSwitchHandleChange(theme.name)}
            >
              {currentTheme === theme.name ? (
                <>
                  <IoIosCheckmark size={30} className={styles.themeItemIcon} />
                  <div className={styles.themeItemChosen}>{theme.label}</div>
                </>
              ) : (
                <div className={styles.themeItemLabel}>{theme.label}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
