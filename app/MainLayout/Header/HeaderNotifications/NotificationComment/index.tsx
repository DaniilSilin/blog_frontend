import React from "react";
import Commentary from "@/app/components/modules/comment/Commentary";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CommentList from "@/app/components/modules/CommentList";
import NotificationCommentList from "@/app/MainLayout/Header/HeaderNotifications/NotificationCommentList";
import NotificationCommentary from "@/app/MainLayout/Header/HeaderNotifications/NotificationCommentary";
import { CommentType, PostType } from "@/app/types";

// import styles from "@/app/components/modules/comment/comment.module.css";
import styles from "./notification_comment.module.css";

export interface Props {
  width: number;
  height: number;
  slug: string;
  post_id: number;
  comment: CommentType;
  post: PostType;
  isReplyToParentComment: boolean;
}

export default function NotificationComment({
  width,
  height,
  post_id,
  slug,
  comment,
  post,
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
      <NotificationCommentary
        width={width}
        height={height}
        comment={comment}
        post_id={post_id}
        slug={slug}
        post={post}
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
