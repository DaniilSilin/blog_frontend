import React from "react";
import { useAppSelector } from "@/app/store";
import { Layout, Menu } from "antd/lib";
const { Header } = Layout;

import { IoReorderThreeOutline } from "react-icons/io5";

import SignIn from "./SignIn";
import HeaderProfile from "./HeaderProfile";
import HeaderSettings from "./HeaderSettings";
import HeaderNotifications from "./HeaderNotifications";

import styles from "./header.module.css";

export interface Props {
  isWideScreen: boolean;
  setIsMainSiderHidden: (value: boolean) => void;
  setIsSiderExpanded: (value: boolean) => void;
}

export default function HeaderReact({
  setIsMainSiderHidden,
  isWideScreen,
  setIsSiderExpanded,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const toggleSiderMode = React.useCallback(() => {
    if (isWideScreen) {
      // @ts-ignore
      setIsSiderExpanded((isWideScreen) => !isWideScreen);
    } else {
      // @ts-ignore
      setIsMainSiderHidden((isWideScreen) => !isWideScreen);
    }
  }, [isWideScreen, setIsMainSiderHidden, setIsSiderExpanded]);

  return (
    <Header className={styles.root}>
      <Menu theme="dark" mode="horizontal" className={styles.headerMenu}>
        {!user.isGuest ? (
          <div className={styles.container}>
            <button className={styles.start} onClick={toggleSiderMode}>
              <IoReorderThreeOutline size={40} />
            </button>
            <div className={styles.headerActions}>
              <HeaderNotifications />
              <HeaderProfile />
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <button className={styles.toggleButton} onClick={toggleSiderMode}>
              <IoReorderThreeOutline size={40} />
            </button>
            <div className={styles.headerActions}>
              <HeaderSettings />
              <SignIn />
            </div>
          </div>
        )}
      </Menu>
    </Header>
  );
}
