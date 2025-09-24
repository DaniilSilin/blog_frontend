import React from "react";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import { UserMenuType } from "@/app/types";

import { IoIosArrowDown } from "react-icons/io";

import USER_MENU from "./constants";
import SwitchThemeMenu from "./SwitchThemeMenu";
import HeaderProfileMenuItem from "./HeaderProfileMenuItem";

import styles from "./header_profile.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export default function HeaderProfile() {
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state) => state.django.profile);
  const userMenuItems = USER_MENU(user);

  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSwitchThemeMenuVisible, setIsSwitchThemeMenuVisible] =
    React.useState(false);

  React.useEffect(() => {
    if (!isUserMenuOpen) {
      setIsSwitchThemeMenuVisible(false);
    }
  }, [isUserMenuOpen]);

  const toggleUserMenuButton = React.useCallback(() => {
    setIsUserMenuOpen((openMenu) => !openMenu);
  }, []);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!userMenuRef.current) return;
      const isClickInsideMenu = userMenuRef.current.contains(e.target as Node);
      if (isUserMenuOpen && !isClickInsideMenu) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isUserMenuOpen]);

  return (
    <div ref={userMenuRef} className={styles.root}>
      <div className={styles.userMenuButton} onClick={toggleUserMenuButton}>
        <Image
          src={
            user?.avatar_small
              ? `${BASE_URL}${user?.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          className={styles.userMenuAvatar}
          width={52}
          height={52}
          alt=""
        />
        <IoIosArrowDown size={20} />
      </div>
      <div>
        {isUserMenuOpen && (
          <>
            {isSwitchThemeMenuVisible ? (
              <SwitchThemeMenu
                setIsSwitchThemeMenuVisible={setIsSwitchThemeMenuVisible}
              />
            ) : (
              <div className={styles.userMenuContainer}>
                {userMenuItems.map((menuItem: UserMenuType) => (
                  <HeaderProfileMenuItem
                    menuItem={menuItem}
                    setOpenUserMenu={setIsUserMenuOpen}
                    setDisplaySwitchThemeMenu={setIsSwitchThemeMenuVisible}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
