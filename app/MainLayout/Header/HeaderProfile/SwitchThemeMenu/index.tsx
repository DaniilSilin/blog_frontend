import React from "react";

import { FaArrowLeft } from "react-icons/fa";
import ThemeItem from "./ThemeItem";

import styles from "./switch_theme.module.scss";

export interface Props {
  setIsSwitchThemeMenuVisible: (value: boolean) => void;
}

interface Theme {
  id: number;
  label: string;
  theme: string;
}

const themeList: Theme[] = [
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
  setIsSwitchThemeMenuVisible,
}: Props) {
  const [currentMenuThemeTitle, setCurrentMenuThemeTitle] = React.useState("");
  const handleBackToMenuClick = React.useCallback(() => {
    setIsSwitchThemeMenuVisible(false);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button
          className={styles.backToMenuButton}
          onClick={handleBackToMenuClick}
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
          {themeList.map((themeItem: Theme) => (
            <ThemeItem
              key={themeItem.id}
              themeItem={themeItem}
              setCurrentMenuThemeTitle={setCurrentMenuThemeTitle}
              currentMenuThemeTitle={currentMenuThemeTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
