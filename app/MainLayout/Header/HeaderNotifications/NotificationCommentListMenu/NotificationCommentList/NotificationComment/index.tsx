import React from "react";

import { CommentType, PostType } from "@/app/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import NotificationCommentList from "../index";
import NotificationCommentary from "@/app/MainLayout/Header/HeaderNotifications/NotificationCommentary";

import styles from "./notification_comment.module.css";

export interface Props {
  width: number;
  height: number;
  slug: string;
  post_id: number;
  comment: CommentType;
  post: PostType;
}

export default function NotificationComment({
  width,
  height,
  post_id,
  slug,
  comment,
  post,
}: Props) {
  const [shouldShowReplies, setShouldShowReplies] = React.useState(false);
  const toggleReplies = React.useCallback(() => {
    setShouldShowReplies((should) => !should);
  }, []);

  const countOfRepliesTitle = React.useMemo(() => {
    const repliesCount = comment?.replies_count.toString();

    if (repliesCount.slice(-1) === "1" && repliesCount.slice(-2) !== "11") {
      return `${repliesCount} ответ`;
    } else if (
      (repliesCount.slice(-1) === "2" ||
        repliesCount.slice(-1) === "3" ||
        repliesCount.slice(-1) === "4") &&
      repliesCount.slice(-2) !== "12" &&
      repliesCount.slice(-2) !== "13" &&
      repliesCount.slice(-2) !== "14"
    ) {
      return `${repliesCount} ответа`;
    } else {
      return `${repliesCount} ответов`;
    }
  }, [comment]);

  return (
    <div className={styles.root}>
      <NotificationCommentary
        width={width}
        height={height}
        comment={comment}
        post_id={post_id}
        slug={slug}
        post={post}
      />
      {!!comment?.replies_count && (
        <div className={styles.commentRepliesContainer}>
          {!comment.forceRender && (
            <button
              className={styles.showRepliesButton}
              onClick={toggleReplies}
            >
              {shouldShowReplies ? (
                <IoIosArrowUp size={20} className={styles.arrow} />
              ) : (
                <IoIosArrowDown size={20} className={styles.arrow} />
              )}
              {countOfRepliesTitle}
            </button>
          )}
          {(shouldShowReplies || comment.forceRender) && (
            <NotificationCommentList
              width={24}
              height={24}
              slug={slug}
              post_id={post_id}
              parent_id={comment.comment_id}
              post={post}
            />
          )}
        </div>
      )}
    </div>
  );
}
