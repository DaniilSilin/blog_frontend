import React from "react";
import ClipboardTextNotification from "@/app/contexts/ClipboardTextNotification";
import { PostType, ShareMenuItemType } from "@/app/types";

import ShareMenuItem from "./ShareMenuItem";

import styles from "./share_menu.module.css";
import shareMenuList from "@/app/components/modules/post_page/PostFooter/ShareButton/ShareMenu/ShareMenuItem/constants";

export interface Props {
  displayShareMenu: boolean;
  setDisplayShareMenu: (value: boolean) => void;
  post: PostType;
}

export default function ShareMenu({
  post,
  setDisplayShareMenu,
  displayShareMenu,
}: Props) {
  const shareMenuRef = React.useRef<HTMLDivElement | null>(null);
  const shareMenuListItem = shareMenuList(post);

  React.useEffect(() => {
    if (!shareMenuRef.current) return;
    const rect = shareMenuRef.current.getBoundingClientRect();
    if (rect.bottom > 800 && innerWidth > 500) {
      shareMenuRef.current.style.top = "auto";
      shareMenuRef.current.style.bottom = "110%";
    }
  }, [displayShareMenu]);

  return (
    <div ref={shareMenuRef} className={styles.root}>
      <div className={styles.shareTitle}>Поделиться</div>
      <div className={styles.shareListContainer}>
        {shareMenuListItem.map((menuItem: ShareMenuItemType) => (
          <ShareMenuItem
            key={menuItem.id}
            menuItem={menuItem}
            post={post}
            setDisplayShareMenu={setDisplayShareMenu}
          />
        ))}
      </div>
    </div>
  );
}
