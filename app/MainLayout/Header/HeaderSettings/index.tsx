import React from "react";
import CookieHelper from "@/app/store/cookieHelper";

import { BsThreeDotsVertical } from "react-icons/bs";
import SettingsThemeMenu from "./SettingsThemeMenu";

import styles from "./header_settings.module.css";

export default function HeaderSettings() {
  const settingsMenu = React.useRef<HTMLDivElement | null>(null);
  const [displaySettingsMenu, setDisplaySettingsMenu] = React.useState(false);
  const [displayThemeMenu, setDisplayThemeMenu] = React.useState(false);

  const initialTheme =
    CookieHelper.getCookie("theme") === "dark" ? "dark" : "light";
  const [currentTheme, setCurrentTheme] = React.useState(initialTheme);

  const currentThemeLabel = React.useMemo(() => {
    return currentTheme === "light" ? "Светлая" : "Тёмная";
  }, [currentTheme]);

  // fix
  const handleShowSettingsMenuClick = React.useCallback(() => {
    if (!displaySettingsMenu && !displayThemeMenu) {
      setDisplaySettingsMenu(true);
    } else if (displaySettingsMenu && !displayThemeMenu) {
      setDisplaySettingsMenu(false);
    } else if (!displaySettingsMenu && displayThemeMenu) {
      setDisplayThemeMenu(false);
    }
  }, [displaySettingsMenu, displayThemeMenu]);
  // fix

  const handleShowThemeMenuClick = React.useCallback(() => {
    setDisplaySettingsMenu(false);
    setDisplayThemeMenu(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!settingsMenu.current) return;
      const isClickInsideMenu = settingsMenu.current.contains(e.target as Node);
      if (!isClickInsideMenu) {
        setDisplaySettingsMenu(false);
        setDisplayThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.root} ref={settingsMenu}>
      <button
        className={styles.menuButton}
        onClick={handleShowSettingsMenuClick}
      >
        <BsThreeDotsVertical size={20} />
      </button>
      {displayThemeMenu && (
        <SettingsThemeMenu
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          setDisplayThemeMenu={setDisplayThemeMenu}
          setDisplaySettingsMenu={setDisplaySettingsMenu}
        />
      )}
      {displaySettingsMenu && (
        <div className={styles.settingsMenu}>
          <div className={styles.settingsMenuItem}>Язык: Русский</div>
          <button
            className={styles.settingsMenuItem}
            onClick={handleShowThemeMenuClick}
          >
            Тема: {currentThemeLabel}
          </button>
        </div>
      )}
    </div>
  );
}
