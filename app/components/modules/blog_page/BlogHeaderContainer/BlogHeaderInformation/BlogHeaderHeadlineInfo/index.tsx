import React from "react";
import { BlogType } from "@/app/types";

import BlogActionMenu from "./BlogActionMenu";
import BlogHeaderMetadata from "./BlogHeaderMetadata";
import BlogHeaderDescriptionPreview from "./BlogHeaderDescriptionPreview";

import styles from "./blog_header_headline_info.module.css";

export interface Props {
  blog: BlogType;
  slug: string;
}

export default function BlogHeaderHeadlineInfo({ blog, slug }: Props) {
  return (
    <div className={styles.root}>
      <BlogHeaderMetadata blog={blog} />
      <BlogHeaderDescriptionPreview blog={blog} />
      <BlogActionMenu blog={blog} slug={slug} />
    </div>
  );
}
