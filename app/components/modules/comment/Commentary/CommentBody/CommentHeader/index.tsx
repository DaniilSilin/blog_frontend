import React from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";

import { VscPinned } from "react-icons/vsc";
import { CommentType, PostType } from "@/app/types";

import styles from "./comment_header.module.css";

export interface Props {
  post: PostType;
  comment: CommentType;
}

export default function CommentHeader({ comment, post }: Props) {
  return (
    <div className={styles.root}>
      {comment.is_pinned && (
        <div className={styles.commentIsPinnedContainer}>
          <VscPinned className={styles.pinIcon} />
          <div>Закреплено</div>
        </div>
      )}
      <div className={styles.commentAuthorHeader}>
        <Link href={`/profile/${comment.author.username}/`}>
          {post?.author.username === comment?.author.username ? (
            <div className={styles.commentAuthorIsPostAuthor}>
              {comment?.author.username}
            </div>
          ) : (
            <div className={styles.commentAuthor}>
              {comment.author.username}
            </div>
          )}
        </Link>
        {comment.is_edited ? (
          <div className={styles.date}>
            {moment(comment.created_at).fromNow()}
            &nbsp;
            {`(изменено)`}
          </div>
        ) : (
          <div className={styles.date}>
            {moment(comment.created_at).fromNow()}
          </div>
        )}
      </div>
    </div>
  );
}
