import React from "react";
import CookieHelper from "@/app/store/cookieHelper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { UserMenuType } from "@/app/types";

import { IoIosArrowForward } from "react-icons/io";
import { logout as reduxLogout } from "@/app/store/reducers/slices/djangoSlice";

import styles from "./header_profile_menu_item.module.css";

export interface Props {
  menuItem: UserMenuType;
  setOpenUserMenu: (value: boolean) => void;
  setDisplaySwitchThemeMenu: any;
}

export default function HeaderProfileMenuItem({
  menuItem,
  setDisplaySwitchThemeMenu,
  setOpenUserMenu,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  //
  const initialTheme = CookieHelper.getCookie("theme") || "light";
  const [currentTheme, setCurrentTheme] = React.useState(initialTheme);
  const [currentThemeLabel, setCurrentThemeLabel] = React.useState(
    initialTheme === "light" ? "светлая" : "тёмная",
  );
  //

  const logout = () => {
    CookieHelper.removeCookie("token");
    dispatch(reduxLogout());
    setOpenUserMenu(false);
    router.push("/");
  };

  const handleMenuItemClick = React.useCallback(() => {
    if (menuItem.title === "Палитра") {
      setDisplaySwitchThemeMenu(true);
    } else if (menuItem.title === "Выйти") {
      logout();
      setOpenUserMenu(false);
    } else {
      setOpenUserMenu(false);
    }
  }, []);

  return (
    <>
      <div className={styles.root} onClick={handleMenuItemClick}>
        {!!menuItem.link ? (
          <Link href={menuItem.link}>
            <div className={styles.userMenuItemContainer}>
              <div className={styles.userMenuItemIcon}>{menuItem.icon}</div>
              <div>{menuItem.title}</div>
            </div>
          </Link>
        ) : (
          <div className={styles.nonLinkUserItemContainer}>
            {menuItem.id === 4 && (
              <>
                <div className={styles.userMenuItemIcon}>{menuItem.icon}</div>
                <div>Тема: {currentThemeLabel}</div>
                <IoIosArrowForward size={24} style={{ marginLeft: "40px" }} />
              </>
            )}
            {menuItem.id === 7 && (
              <>
                <div className={styles.userMenuItemIcon}>{menuItem.icon}</div>
                <div>{menuItem.title}</div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
