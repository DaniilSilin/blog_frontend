import React from "react";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";

import { CommentType, PostType } from "@/app/types";

import { VscPinned } from "react-icons/vsc";

import CommentBox from "@/app/components/modules/comment/CommentBox";
import NotificationCommentaryMainFooter from "./NotificationCommentaryMainFooter";

import styles from "./notification_commentary_header.module.css";

export interface Props {
  width: number;
  height: number;
  comment: CommentType;
  post: PostType;
  slug: string;
  post_id: number;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function NotificationCommentaryMain({
  slug,
  comment,
  post,
  post_id,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [displayReplyInput, setDisplayReplyInput] = React.useState(false);

  return (
    <div className={styles.commentContainer}>
      <div>
        <div className={styles.commentHeader}>
          {comment.is_pinned && (
            <div className={styles.pinned_comment}>
              <VscPinned style={{ marginRight: "5px" }} />
              Закреплено пользователем {comment.pinned_by_user.username}
            </div>
          )}
          <div style={{ display: "flex", lineHeight: "20px" }}>
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
        <div className={styles.commentBody}>
          <div>{comment.body}</div>
        </div>
        <NotificationCommentaryMainFooter
          slug={slug}
          post_id={post_id}
          post={post}
          comment={comment}
          displayReplyInput={displayReplyInput}
          setDisplayReplyInput={setDisplayReplyInput}
        />
        <div className={styles.createReplyContainer}>
          {displayReplyInput && (
            <>
              <Image
                src={
                  user?.avatar_small
                    ? `${BASE_URL}${user?.avatar_small}`
                    : "/img/default/avatar_default.jpg"
                }
                width={32}
                height={32}
                className={styles.createReplyUserAvatar}
                alt={""}
              />
              <CommentBox
                comment={comment}
                post_id={post_id}
                slug={slug}
                // editMode={editMode}
                displayReplyInput={displayReplyInput}
                setDisplayReplyInput={setDisplayReplyInput}
                placeholder={"Введите ответ"}
                submitButtonText={"Ответить"}
                // isReplyToParentComment={isReplyToParentComment}
                // setLoading={setLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
