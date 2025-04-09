import React from "react";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import CookieHelper from "@/app/store/cookieHelper";
import { useDispatch } from "react-redux";
import { logout as reduxLogout } from "@/app/store/reducers/slices/djangoSlice";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineCreate } from "react-icons/md";
import {
  IoIosCheckmark,
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosLogOut,
} from "react-icons/io";
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { BsPaletteFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";

const BASE_URL = "http://127.0.0.1:8000";

import styles from "./header_profile.module.css";

export default function HeaderProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userRef = React.useRef(null);
  const [openUserMenu, setOpenUserMenu] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.django.profile);

  const logout = () => {
    CookieHelper.removeCookie("token");
    dispatch(reduxLogout());
    setOpenUserMenu(false);
    router.push("/");
  };

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (openUserMenu) {
        // @ts-ignore
        if (!userRef.current.contains(e.target)) {
          setOpenUserMenu(false);
        }
      } else {
        // @ts-ignore
        if (userRef.current.contains(e.target)) {
          setOpenUserMenu(true);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  });

  const displayProfileHandleChange = React.useCallback(() => {
    // setOpenUserMenu(!openUserMenu)
  }, [openUserMenu, setOpenUserMenu]);

  const hideProfileHeaderHandleClick = React.useCallback(() => {
    setOpenUserMenu(false);
  }, [setOpenUserMenu]);

  if (!user.isGuest) {
    return (
      <div ref={userRef} className={styles.root}>
        <div
          onClick={displayProfileHandleChange}
          className={styles.avatarContainer}
        >
          <Image
            src={
              user?.avatar_small
                ? `${BASE_URL}${user?.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            className={styles.avatar}
            width={52}
            height={52}
            alt=""
          />
          <IoIosArrowDown size={20} />
        </div>
        <div>
          {openUserMenu && (
            <div className={styles.profileMenu}>
              <div
                className={styles.profileMenuElement}
                onClick={hideProfileHeaderHandleClick}
              >
                <Link href={`/profile/${user?.username}`}>
                  <div className={styles.profileMenuContainer}>
                    <ImBooks
                      className={styles.profileMenuElementIcon}
                      size={24}
                    />
                    <div>Профиль</div>
                  </div>
                </Link>
              </div>
              <div
                className={styles.profileMenuElement}
                onClick={hideProfileHeaderHandleClick}
              >
                <Link href={`/blog/create`}>
                  <div className={styles.profileMenuContainer}>
                    <MdOutlineCreate
                      className={styles.profileMenuElementIcon}
                      size={24}
                    />
                    <div>Создать блог</div>
                  </div>
                </Link>
              </div>
              <div
                className={styles.profileMenuElement}
                onClick={hideProfileHeaderHandleClick}
              >
                <Link href={`/invite/list/`}>
                  <div className={styles.profileMenuContainer}>
                    <IoMdPersonAdd
                      className={styles.profileMenuElementIcon}
                      size={24}
                    />
                    <div>Приглашения</div>
                  </div>
                </Link>
              </div>
              <div
                className={styles.profileMenuElement}
                style={{ padding: "10px 16px" }}
              >
                <BsPaletteFill
                  className={styles.profileMenuElementIcon}
                  size={24}
                />
                <div>Тема: темная</div>
              </div>
              <div
                className={styles.profileMenuElement}
                onClick={hideProfileHeaderHandleClick}
              >
                <Link href={`/blogs/my`}>
                  <div className={styles.profileMenuContainer}>
                    <ImBooks
                      className={styles.profileMenuElementIcon}
                      size={24}
                    />
                    <div>Мои Блоги</div>
                  </div>
                </Link>
              </div>
              <div
                className={styles.profileMenuElement}
                onClick={hideProfileHeaderHandleClick}
              >
                <Link href={`/profile/${user?.username}/edit`}>
                  <div className={styles.profileMenuContainer}>
                    <IoSettingsOutline
                      className={styles.profileMenuElementIcon}
                      size={24}
                    />
                    <div>Настройки</div>
                  </div>
                </Link>
              </div>
              <div
                onClick={logout}
                className={styles.profileMenuElement}
                style={{ padding: "10px 16px" }}
              >
                <IoIosLogOut
                  className={styles.profileMenuElementIcon}
                  size={24}
                />
                <div>Выйти</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
