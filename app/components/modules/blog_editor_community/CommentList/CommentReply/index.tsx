import React from "react";
import Image from "next/image";
import CommentInput from "@/app/components/modules/form/CommentInput";
import DjangoService from "@/app/store/services/DjangoService";

import styles from "./comment_reply.module.css";

export interface Props {
  slug: string;
  comment: any;
  setDisplayCommentInputReply: (value: boolean) => void;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function CommentReply({
  comment,
  slug,
  setDisplayCommentInputReply,
}: Props) {
  const commentRef = React.useRef(null);
  const [commentBody, setCommentBody] = React.useState("");
  const [createComment] = DjangoService.useCreateCommentMutation();
  const [focusOnInput, setFocusOnInput] = React.useState(false);

  const createCommentReply = () => {
    if (comment?.reply_to) {
      createComment({
        body: commentBody,
        post_id: comment.post.post_id,
        slug: slug,
        reply_to: comment?.reply_to,
      });
    } else {
      createComment({
        body: commentBody,
        post_id: comment.post.post_id,
        slug: slug,
        reply_to: comment?.comment_id,
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.subRoot}>
        <div className={styles.avatarContainer}>
          <Image
            src={
              comment.author.avatar_small
                ? `${BASE_URL}${comment.author.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            className={styles.userAvatar}
            alt={""}
            width={32}
            height={32}
          />
        </div>
        <div className={styles.inputAndActionButtonsContainer}>
          <CommentInput
            ref={commentRef}
            placeholder={"Введите ответ"}
            height={50}
            onChange={setCommentBody}
            setFocusOnInput={setFocusOnInput}
            value={commentBody}
            defaultValue={comment?.body}
          />
          <div className={styles.commentActionButtons}>
            <button
              className={styles.cancelButton}
              onClick={() => setDisplayCommentInputReply(false)}
            >
              Отмена
            </button>
            <button
              className={styles.submitButton}
              onClick={createCommentReply}
            >
              Ответить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
