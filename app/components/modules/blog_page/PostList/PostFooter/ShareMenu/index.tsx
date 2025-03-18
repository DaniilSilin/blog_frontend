import React from "react";
import { IoLink } from "react-icons/io5";
import Link from "next/link";
import { FaSquareOdnoklassniki } from "react-icons/fa6";
import { ImTelegram, ImVk } from "react-icons/im";

import styles from "./share_menu.module.css";

export interface Props {
  post: any;
}

export default function ShareMenu({ post }: Props) {
  const [copiedText, setCopiedText] = React.useState("");
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    console.log(menuRef.current);
  });

  return (
    <div ref={menuRef} className={styles.root}>
      <div>
        <div className={styles.shareTitle}>Поделиться</div>
      </div>
      <div className={styles.shareMenuListItem}>
        <div>
          <IoLink size={25} />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              "http://localhost:3001/blog/ax1le/post/1",
            );
          }}
        >
          Скопировать
        </div>
      </div>
      <div className={styles.shareMenuListItem}>
        <div>
          <FaSquareOdnoklassniki size={25} />
        </div>
        <Link
          href={`https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent("http://localhost:3001/blog/ax1le/post/1/")}`}
        >
          Одноклассники
        </Link>
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
