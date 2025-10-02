import React from "react";
import Image from "next/image";
import { BlogType } from "@/app/types";

import styles from "./blog_header_avatar.module.css";

export interface Props {
  blog: BlogType;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function BlogHeaderAvatar({ blog }: Props) {
  return (
    <div className={styles.root}>
      <Image
        src={
          blog?.avatar_small
            ? `${BASE_URL}${blog?.avatar_small}`
            : "/img/default/avatar_default.jpg"
        }
        className={styles.avatarImg}
        alt=""
        width={150}
        height={150}
      />
    </div>
  );
}
