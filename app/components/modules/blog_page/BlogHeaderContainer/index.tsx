import React from "react";
import { BlogType } from "@/app/types";

import BlogHeaderBannerContainer from "./BlogHeaderBannerContainer";
import BlogHeaderInformation from "./BlogHeaderInformation";

import styles from "./blog_header_container.module.css";

export interface Props {
  blog: BlogType;
  slug: string;
}

export default function BlogHeaderContainer({ blog, slug }: Props) {
  return (
    <div className={styles.root}>
      <BlogHeaderBannerContainer blog={blog} />
      <BlogHeaderInformation blog={blog} slug={slug} />
    </div>
  );
}
