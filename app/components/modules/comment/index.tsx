import React from "react";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { CommentType, PostType } from "@/app/types";
import Commentary from "@/app/components/modules/comment/Commentary";
import CommentList from "../CommentList";

import styles from "./comment.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: CommentType;
  post: PostType;
  isParent?: boolean;
}

export default function Comment({
  post_id,
  slug,
  comment,
  post,
  isParent,
}: Props) {
  const [shouldShowReplies, setShouldShowReplies] = React.useState(false);
  const toggleReplies = React.useCallback(() => {
    setShouldShowReplies((should) => !should);
  }, []);

  const countOfRepliesTitle = React.useMemo(() => {
    const repliesCount = comment.replies_count.toString();

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
      <Commentary
        width={40}
        height={40}
        comment={comment}
        post_id={post_id}
        slug={slug}
        post={post}
        isParent={isParent}
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
            <CommentList
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
