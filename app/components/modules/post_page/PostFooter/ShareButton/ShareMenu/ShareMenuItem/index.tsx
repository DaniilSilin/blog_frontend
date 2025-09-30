import React from "react";
import Link from "next/link";
import { PostType, ShareMenuItemType } from "@/app/types";

import ClipboardTextNotification from "@/app/contexts/ClipboardTextNotification";

import styles from "./share_menu_item.module.css";

export interface Props {
  menuItem: ShareMenuItemType;
  post: PostType;
  setDisplayShareMenu: (value: boolean) => void;
}

export default function ShareMenuItem({
  menuItem,
  post,
  setDisplayShareMenu,
}: Props) {
  const copyToClipboard = React.useContext(ClipboardTextNotification);

  const handleShareMenuItemButtonClick = React.useCallback(() => {
    if (!menuItem.href) {
      copyToClipboard(post);
    }
    setDisplayShareMenu(false);
  }, [post]);

  return (
    <>
      <button className={styles.root} onClick={handleShareMenuItemButtonClick}>
        <div className={styles.shareIcon}>{menuItem.icon}</div>
        {!!menuItem.href ? (
          <div>
            <Link
              className={styles.shareMenuListItemTitle}
              href={menuItem.href}
            >
              {menuItem.title}
            </Link>
          </div>
        ) : (
          <div className={styles.shareMenuListItemTitle}>{menuItem.title}</div>
        )}
      </button>
    </>
  );
}
