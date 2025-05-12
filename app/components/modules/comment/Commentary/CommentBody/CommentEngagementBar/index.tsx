import React from "react";

import { PostType, CommentType } from "@/app/types";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import DislikeButton from "./DislikeButton";
import LikeByAuthorButton from "./LikeByAuthorButton";

import styles from "./comment_engagement_bar.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: CommentType;
  post: PostType;
  setDisplayReplyInput: (value: boolean) => void;
}

export default function CommentEngagementBar({
  comment,
  post,
  slug,
  post_id,
  setDisplayReplyInput,
}: Props) {
  return (
    <div className={styles.root}>
      <LikeButton slug={slug} post_id={post_id} comment={comment} />
      <DislikeButton slug={slug} post_id={post_id} comment={comment} />
      <LikeByAuthorButton
        slug={slug}
        post_id={post_id}
        comment={comment}
        post={post}
      />
      <ReplyButton
        slug={slug}
        post_id={post_id}
        setDisplayReplyInput={setDisplayReplyInput}
      />
    </div>
  );
}
