import React from "react";
import { Post } from "@/app/types";

import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostBody from "./PostBody";

import styles from "./post_page.module.css";

export interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  return (
    <div className={styles.root}>
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} />
    </div>
  );
}
