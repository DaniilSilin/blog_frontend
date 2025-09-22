import React from "react";

import { Layout, Menu } from "antd/lib";
const { Sider } = Layout;

import { IoFolderOpenOutline, IoHomeOutline } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";

import styles from "./main_sider.module.css";
import { RiArticleLine } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

export interface Props {
  isMainSiderHidden: boolean;
  setIsMainSiderHidden: (value: boolean) => void;
}

const siderMenu = [
  {
    key: "1",
    icon: <IoHomeOutline size={24} />,
    href: "/",
    label: "Главная",
  },
  {
    key: "2",
    icon: <RiArticleLine size={24} />,
    href: "/post/list",
    label: "Публикации",
  },
  {
    key: "3",
    icon: <FaBook size={24} />,
    href: "/blog/list",
    label: "Каналы",
  },
  {
    key: "4",
    icon: <CiBookmark size={24} />,
    href: "/bookmarks",
    label: "Сохранённое",
  },
  {
    key: "5",
    icon: <IoFolderOpenOutline size={24} />,
    href: "/subscriptions",
    label: "Подписки",
  },
  {
    key: "6",
    icon: <AiOutlineLike size={24} />,
    label: "Понравившиеся",
    href: `/liked`,
  },
  {
    key: "7",
    icon: <IoHomeOutline size={24} />,
    href: "/",
    label: "Главная",
  },
  {
    key: "8",
    icon: <RiArticleLine size={24} />,
    href: "/post/list",
    label: "Публикации",
  },
  {
    key: "9",
    icon: <FaBook size={24} />,
    href: "/blog/list",
    label: "Каналы",
  },
  {
    key: "10",
    icon: <CiBookmark size={24} />,
    href: "/bookmarks",
    label: "Сохранённое",
  },
  {
    key: "11",
    icon: <IoFolderOpenOutline size={24} />,
    href: "/subscriptions",
    label: "Подписки",
  },
  {
    key: "12",
    icon: <AiOutlineLike size={24} />,
    label: "Понравившиеся",
    href: `/liked`,
  },
];

export default function MainSider({
  setIsMainSiderHidden,
  isMainSiderHidden,
}: Props) {
  const mainSiderRef = React.useRef(null);
  const router = useRouter();

  React.useEffect(() => {
    const handleOutsideMouseClick = (e: MouseEvent) => {
      // @ts-ignore
      if (!mainSiderRef.current.contains(e.target)) {
        setIsMainSiderHidden(true);
      }
    };
    document.addEventListener("mousedown", handleOutsideMouseClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideMouseClick);
  });

  const handleChangeMenu = React.useCallback(() => {
    // @ts-ignore
    setIsMainSiderHidden((prev) => !prev);
  }, []);

  const defaultSelectedKey = React.useMemo(() => {
    const defaultValue = siderMenu.find((item) => item.href === router.asPath);
    return defaultValue ? defaultValue!.key : "";
  }, [router.asPath]);

  const mainSiderMenuList = siderMenu.map((icon, index) => {
    return {
      key: siderMenu[index].key,
      icon: siderMenu[index].icon,
      label: <Link href={siderMenu[index].href}>{siderMenu[index].label}</Link>,
    };
  });

  return (
    <Sider
      ref={mainSiderRef}
      className={styles.root}
      trigger={null}
      collapsible
      collapsed={isMainSiderHidden}
      collapsedWidth={0}
    >
      <div
        className="demo-logo-vertical"
        style={{ width: "100% !important" }}
      />
      <div className={styles.header}>
        <button className={styles.headerSiderButton} onClick={handleChangeMenu}>
          <IoReorderThreeOutline size={40} />
        </button>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKey]}
        items={mainSiderMenuList}
      />
    </Sider>
  );
}
