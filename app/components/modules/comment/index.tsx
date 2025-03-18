import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { LoadingOutlined } from "@ant-design/icons/lib";
import { Flex, Spin } from "antd/lib";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

import { Comment, Post } from "@/app/types";
import Commentary from "@/app/components/modules/comment/Commentary";

import styles from "./comment.module.css";
import CommentList from "../CommentList";

export interface Props {
  slug: string;
  post_id: number;
  comment: Comment;
  postData: Post;
  isPinned: boolean;
}

export default function Comment({
  post_id,
  slug,
  comment,
  postData,
  isPinned,
}: Props) {
  const [shouldShowReplies, setShouldShowReplies] = React.useState(false);

  const toggleReplies = React.useCallback(() => {
    setShouldShowReplies((should) => !should);
  }, []);

  const countOfRepliesTitle = React.useMemo(() => {
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
        isReplyToParentComment={true}
        isPinned={isPinned}
        isParent
      />
      {!!comment?.count_of_replies && (
        <div className={styles.commentRepliesContainer}>
          <button className={styles.showRepliesButton} onClick={toggleReplies}>
            {shouldShowReplies ? (
              <IoIosArrowUp size={20} className={styles.arrow} />
            ) : (
              <IoIosArrowDown size={20} className={styles.arrow} />
            )}
            {countOfRepliesTitle}
          </button>
          {shouldShowReplies && (
            <CommentList
              slug={slug}
              post_id={post_id}
              parent_id={comment.comment_id}
            />
          )}
        </div>
      )}
    </div>
  );
}
