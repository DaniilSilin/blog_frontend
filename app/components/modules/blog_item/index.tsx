import React from "react";
import { BlogType } from "@/app/types";

import BlogItemHeader from "./BlogItemHeader";
import BlogItemInformation from "./BlogItemInformation";

import styles from "./blog_item.module.css";

export interface Props {
  blog: BlogType;
}

export default function BlogItem({ blog }: Props) {
  return (
    <div className={styles.root}>
      <BlogItemHeader blog={blog} />
      <BlogItemInformation blog={blog} />
    </div>
  );
}
