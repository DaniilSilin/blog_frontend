import React from "react";
import { IoLink } from "react-icons/io5";
import Link from "next/link";
import { ImTelegram, ImVk } from "react-icons/im";

import styles from "./share_menu.module.css";

export interface Props {
  setDisplayShareMenu: (value: boolean) => void;
  post: any;
}

const BASE_URL = "http://127.0.0.1:3001";

export default function ShareMenu({ post, setDisplayShareMenu }: Props) {
  const [copiedText, setCopiedText] = React.useState("");
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    console.log(menuRef.current);
  });

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
      <div className={styles.shareMenuListItem}>
        <div>
          <IoLink size={25} className={styles.shareIcon} />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${BASE_URL}/blog/${post.blog.slug}/post/${post.post_id}/`,
            );
          }}
        >
          Скопировать
        </div>
      </div>
      <div className={styles.shareMenuListItem}>
        <ImVk size={25} />
        <Link
          href={`https://vk.com/share.php?url=${encodeURIComponent("http://localhost:3001/blog/ax1le/post/1/")}&title=${post.title}?share_to=vk`}
        >
          ВКонтакте
        </Link>
      </div>
      <div className={styles.shareMenuListItem}>
        <ImTelegram size={25} />
        <Link
          href={`https://t.me/share/url?url=${encodeURIComponent("http://localhost:3001/blog/ax1le/post/1/")}?share_to=telegram&text=${post.title}`}
        >
          Telegram
        </Link>
      </div>
    </div>
  );
}
