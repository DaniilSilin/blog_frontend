import React from "react";

import ThemeListItem from "./ThemeListItem";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./settings_theme_menu.module.css";

export interface Props {
  currentTheme: string;
  setCurrentTheme: (value: string) => void;
  setDisplayThemeMenu: (value: boolean) => void;
  setDisplaySettingsMenu: (value: boolean) => void;
}

const themeList = [
  {
    id: 1,
    theme: "light",
    label: "Светлая",
  },
  {
    id: 2,
    theme: "dark",
    label: "Тёмная",
  },
];

export default function SettingsThemeMenu({
  currentTheme,
  setCurrentTheme,
  setDisplayThemeMenu,
  setDisplaySettingsMenu,
}: Props) {
  const returnToMenu = React.useCallback(() => {
    setDisplayThemeMenu(false);
    setDisplaySettingsMenu(true);
  }, []);

  return (
    <div className={styles.root}>
      <button className={styles.returnBackToMenuButton} onClick={returnToMenu}>
        <FaArrowLeft size={15} style={{ marginLeft: "8px" }} />
        <div className={styles.returnBackToMenuSubButton}>Назад</div>
      </button>
      <div className={styles.themeMenuListContainer}>
        {themeList.map((themeListItem: Record<string, any>) => (
          <ThemeListItem
            key={themeListItem.id}
            currentTheme={currentTheme}
            themeListItem={themeListItem}
            setCurrentTheme={setCurrentTheme}
          />
        ))}
      </div>
    </div>
  );
}
