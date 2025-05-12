import React from "react";
import { useAppSelector } from "@/app/store";
import Image from "next/image";

import { CommentType, PostType } from "@/app/types";
import CommentHeader from "./CommentHeader";
import CommentContent from "./CommentContent";
import CommentEngagementBar from "./CommentEngagementBar";
import CommentBox from "@/app/components/modules/comment/CommentBox";

import styles from "./comment_body.module.css";

export interface Props {
  comment: CommentType;
  post: PostType;
  slug: string;
  post_id: number;
  displayReplyInput: boolean;
  editMode: boolean;
  setDisplayReplyInput: any;
  setLoading: boolean;
  isParent?: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function CommentBody({
  comment,
  post,
  slug,
  post_id,
  displayReplyInput,
  editMode,
  setDisplayReplyInput,
  isParent,
  setLoading,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);

  return (
    <div className={styles.root}>
      <div className={styles.subRoot}>
        <CommentHeader comment={comment} post={post} />
        <CommentContent comment={comment} />
        <CommentEngagementBar
          comment={comment}
          post={post}
          slug={slug}
          post_id={post_id}
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
                editMode={editMode}
                displayReplyInput={displayReplyInput}
                setDisplayReplyInput={setDisplayReplyInput}
                placeholder={"Введите ответ"}
                submitButtonText={"Ответить"}
                setLoading={setLoading}
                isParent={isParent}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
