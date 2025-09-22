import React from "react";

import { PostType } from "@/app/types";
import styles from "../blog_page.module.css";
import PostItem from "@/app/components/modules/post_page";

export interface Props {
  post: PostType;
}

export default function PostList({ post }: Props) {
  return (
    <div>
      <PostItem post={post} />
    </div>
  );
}
