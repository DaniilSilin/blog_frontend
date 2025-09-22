import React from "react";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import classNames from "classnames";

import CommunityCommentEditInput from "@/app/components/modules/form/CommunityCommentEditInput";

import styles from "./comment_edit_mode.module.css";
import DjangoService from "@/app/store/services/DjangoService";

const BASE_URL = "http://127.0.0.1:8000/";

export interface Props {
  slug: string;
  comment: any;
  setIsEditModeOn: (value: boolean) => void;
}

export default function CommentEditMode({
  slug,
  comment,
  setIsEditModeOn,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [commentBody, setCommentBody] = React.useState(comment?.body);
  const [isOnFocus, setIsOnFocus] = React.useState(false);

  const [updateComment] = DjangoService.useUpdateCommentMutation();

  const leaveComment = async () => {
    updateComment({
      slug,
      post_id: comment?.post.post_id,
      comment_id: comment?.comment_id,
      body: commentBody,
    });
    setIsEditModeOn(false);
  };

  const cancelButton = () => {
    setIsEditModeOn(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.commentBox}>
        <div className={styles.avatarContainer}>
          <Image
            className={styles.avatar}
            src={
              user.avatar_small
                ? `${BASE_URL}${user.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            width={40}
            height={40}
            alt={""}
          />
        </div>
        <div>
          <div className={styles.inputComment}>
            <CommunityCommentEditInput
              placeholder={"Введите комментарий"}
              value={commentBody}
              defaultValue={comment.body}
              onChange={setCommentBody}
            />
          </div>
          <div className={styles.footerComment}>
            <button className={styles.cancelButton} onClick={cancelButton}>
              Отмена
            </button>
            <div
              onClick={leaveComment}
              // @ts-ignore
              disabled={commentBody === comment?.body || commentBody === ""}
              className={classNames(styles.submitButton, {
                [styles.active]: !(
                  commentBody === comment?.body || commentBody === ""
                ),
              })}
            >
              Сохранить
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "48px" }}></div>
    </div>
  );
}
