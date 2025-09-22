import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import { BsThreeDotsVertical } from "react-icons/bs";
import { TiArrowForwardOutline } from "react-icons/ti";

import SettingsThemeMenu from "./SettingsThemeMenu";

import styles from "./header_settings.module.css";

export default function HeaderSettings() {
  const settingsMenu = React.useRef(null);
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const [displayThemeMenu, setDisplayThemeMenu] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState(
    CookieHelper.getCookie("theme") ? CookieHelper.getCookie("theme") : "light",
  );
  const [currentThemeLabel, setCurrentThemeLabel] = React.useState(
    CookieHelper.getCookie("theme") === "dark" ? "Тёмный" : "Светлый",
  );

  const handleShowDisplayMenu = React.useCallback(() => {
    setDisplayMenu(true);
  }, [setDisplayMenu]);

  const handleShowDisplayThemeMenu = React.useCallback(() => {
    setDisplayMenu(false);
    setDisplayThemeMenu(true);
  }, [setDisplayMenu, setDisplayThemeMenu]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (!settingsMenu.current.contains(e.target)) {
        setDisplayMenu(false);
        setDisplayThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={styles.root} ref={settingsMenu}>
      <button className={styles.menuButton} onClick={handleShowDisplayMenu}>
        <BsThreeDotsVertical size={20} />
      </button>
      {displayMenu && (
        <div className={styles.settingsMenu}>
          <div
            className={styles.settingsMenuItem}
            onClick={handleShowDisplayThemeMenu}
          >
            Тема: {currentTheme}
            <TiArrowForwardOutline size={20} />
          </div>
          <div>Язык</div>
        </div>
      )}
      {displayThemeMenu && (
        <SettingsThemeMenu
          setDisplayMenu={setDisplayMenu}
          setCurrentTheme={setCurrentTheme}
          setDisplayThemeMenu={setDisplayThemeMenu}
        />
      )}
    </div>
  );
}
