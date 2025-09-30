import React from "react";
import { PostType } from "@/app/types";

import { TiArrowForwardOutline } from "react-icons/ti";
import ShareMenu from "./ShareMenu";

import styles from "./share_button.module.css";

export interface Props {
  post: PostType;
}

export default function ShareButton({ post }: Props) {
  const shareMenuContainer = React.useRef<HTMLDivElement | null>(null);
  const [displayShareMenu, setDisplayShareMenu] = React.useState(false);

  const handleShowShareMenu = React.useCallback(() => {
    setDisplayShareMenu((displayShareMenu) => !displayShareMenu);
  }, []);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!shareMenuContainer.current) return;
      const isClickInsideMenu = shareMenuContainer.current.contains(
        e.target as Node,
      );
      if (displayShareMenu && !isClickInsideMenu) {
        setDisplayShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [displayShareMenu]);

  return (
    <div ref={shareMenuContainer} className={styles.root}>
      <button className={styles.shareButton} onClick={handleShowShareMenu}>
        <TiArrowForwardOutline className={styles.shareIcon} size={20} />
        <div>Поделиться</div>
      </button>
      {displayShareMenu && (
        <ShareMenu
          setDisplayShareMenu={setDisplayShareMenu}
          displayShareMenu={displayShareMenu}
          post={post}
        />
      )}
    </div>
  );
}
