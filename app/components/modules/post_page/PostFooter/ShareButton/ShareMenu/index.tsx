import React from "react";
import Link from "next/link";
import ClipboardTextNotification from "@/app/contexts/ClipboardTextNotification";

import { PostType } from "@/app/types";

import { ImTelegram, ImVk } from "react-icons/im";
import { IoLink } from "react-icons/io5";

import styles from "./share_menu.module.css";

export interface Props {
  setDisplayShareMenu: (value: boolean) => void;
  post: PostType;
}

const shareMenuList = [
  {
    id: 1,
    title: "Скопировать",
    icon: <IoLink size={25} className={styles.shareIcon} />,
    href: "23",
    isLink: false,
  },
  {
    id: 2,
    title: "Telegram",
    icon: <ImTelegram size={25} />,
    href: `https://t.me/share/url?url=${encodeURIComponent("http://localhost:3001/blog/ax1le/post/1/")}?share_to=telegram&text=${123}`,
    isLink: true,
  },
  {
    id: 3,
    title: "VK",
    icon: <ImVk size={25} />,
    href: `https://t.me/share/url?url=${encodeURIComponent("http://localhost:3001/blog/ax1le/post/1/")}?share_to=telegram&text=${4}`,
    isLink: false,
  },
];

export default function ShareMenu({ post, setDisplayShareMenu }: Props) {
  const menuRef = React.useRef(null);

  const copyToClipboard = React.useContext(ClipboardTextNotification);
  const copyText = () => {
    copyToClipboard(post);
    setDisplayShareMenu(false);
  };

  const hideMenu = React.useCallback(() => {
    setDisplayShareMenu(false);
  }, [setDisplayShareMenu]);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (!menuRef.current.contains(e.target)) {
        setDisplayShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <div ref={menuRef} className={styles.root}>
      <div className={styles.shareTitle}>Поделиться</div>
      <div className={styles.shareListContainer}>
        {shareMenuList.map((item) => (
          <div
            key={item.id}
            className={styles.shareMenuListItem}
            onClick={copyText}
          >
            <div className={styles.shareIcon}>{item.icon}</div>
            {item.isLink ? (
              <div>
                <Link
                  className={styles.shareMenuListItemTitle}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </div>
            ) : (
              <div>{item.title}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
