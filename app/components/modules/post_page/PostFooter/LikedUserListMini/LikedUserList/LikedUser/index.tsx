import React from "react";
import Link from "next/link";
import Image from "next/image";

const BASE_URL = "http://127.0.0.1:8000";

import styles from "./liked_user.module.css";

export interface Props {
  user: any;
}

export default function LikedUser({ user }: Props) {
  return (
    <div className={styles.root}>
      <Link href={`/profile/${user.username}/`}>
        <Image
          src={
            user.avatar_small
              ? `${BASE_URL}${user.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          className={styles.avatar}
          width={108}
          height={108}
          alt={""}
        />
      </Link>
      <div className={styles.likeReaction}></div>
      <Link href={`/profile/${user.username}/`}>
        <div className={styles.username}>{user.username}</div>
      </Link>
    </div>
  );
}
