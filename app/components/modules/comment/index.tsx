import React from "react";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { Comment as CommentType, Post } from "@/app/types";

import Commentary from "@/app/components/modules/comment/Commentary";
import CommentList from "../CommentList";

import styles from "./comment.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: CommentType;
  postData: Post;
  isReplyToParentComment?: boolean;
}

export default function Comment({
  post_id,
  slug,
  comment,
  postData,
  isReplyToParentComment,
}: Props) {
  const [shouldShowReplies, setShouldShowReplies] = React.useState(false);
  const toggleReplies = React.useCallback(() => {
    setShouldShowReplies((should) => !should);
  }, []);

  const countOfRepliesTitle = React.useMemo(() => {
    // @ts-ignore
    const countOfReplies = comment?.count_of_replies.toString();

    if (countOfReplies.slice(-1) === "1" && countOfReplies.slice(-2) !== "11") {
      return `${countOfReplies} ответ`;
    } else if (
      (countOfReplies.slice(-1) === "2" ||
        countOfReplies.slice(-1) === "3" ||
        countOfReplies.slice(-1) === "4") &&
      countOfReplies.slice(-2) !== "12" &&
      countOfReplies.slice(-2) !== "13" &&
      countOfReplies.slice(-2) !== "14"
    ) {
      return `${countOfReplies} ответа`;
    } else {
      return `${countOfReplies} ответов`;
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
        postData={postData}
        isParent
        isReplyToParentComment={isReplyToParentComment}
      />
      {!!comment?.count_of_replies && (
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
              postData={postData}
            />
          )}
        </div>
      )}
    </div>
  );
}
