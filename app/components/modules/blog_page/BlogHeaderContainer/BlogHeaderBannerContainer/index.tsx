import React from "react";
import Image from "next/image";
import { BlogType } from "@/app/types";

import styles from "./blog_header_banner_container.module.css";

export interface Props {
  blog: BlogType;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function BlogHeaderBannerContainer({ blog }: Props) {
  return (
    <div>
      <Image
        src={
          blog?.banner_small
            ? `${BASE_URL}${blog?.banner_small}`
            : "/img/default/banner.jpg"
        }
        width={1070}
        height={180}
        className={styles.bannerImg}
        alt=""
      />
    </div>
  );
}
