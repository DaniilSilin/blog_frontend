import React from "react";
import { PostType } from "@/app/types";

import styles from "./post_footer.module.css";

import TagList from "./TagList";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";
import LikeDislikeButton from "./LikeDislikeButton";

export interface Props {
  post: PostType;
}

export default function PostFooter({ post }: Props) {
  return (
    <div>
      <TagList tags={post?.tags} />
      <div className={styles.actionContainer}>
        <LikeDislikeButton post={post} />
        <BookmarkButton post={post} />
        <ShareButton post={post} />
      </div>
    </div>
  );
}
