import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CommentType, PostType } from "@/app/types";
import { BsThreeDotsVertical } from "react-icons/bs";

import NotificationCommentaryMain from "./NotificationCommentaryMain";
import NotificationCommentaryActionMenu from "./NotificationCommentaryActionMenu";

import styles from "./notification_commentary.module.css";

export interface Props {
  width: number;
  height: number;
  comment: CommentType;
  post_id: number;
  slug: string;
  post: PostType;
  isParent: boolean;
  isReplyToParentComment: boolean;
}

const BASE_URL = "http://127.0.0.1:8000/";

export default function NotificationCommentary({
  width,
  height,
  comment,
  post,
  slug,
  post_id,
}: Props) {
  const [displayActionMenu, setDisplayActionMenu] = React.useState(false);

  const actionMenuHandleDisplay = React.useCallback(() => {
    setDisplayActionMenu((displayActionMenu) => !displayActionMenu);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.commentAuthorAvatarBlock}>
        <Link href={`/profile/${comment.author.username}/`}>
          <Image
            className={styles.commentAuthorAvatar}
            src={
              comment.author.avatar_small
                ? `${BASE_URL}${comment.author.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            width={width}
            height={height}
            alt={""}
          />
        </Link>
      </div>
      <NotificationCommentaryMain
        comment={comment}
        width={width}
        height={height}
        post={post}
        post_id={post.post_id}
        slug={slug}
      />
      <div className={styles.actionMenuContainer}>
        <button
          className={styles.commentActionMenuButton}
          onClick={actionMenuHandleDisplay}
        >
          <BsThreeDotsVertical size={20} />
        </button>
        {displayActionMenu && (
          <div className={styles.notificationCommentActionMenu}>
            <NotificationCommentaryActionMenu
              setDisplayActionMenu={setDisplayActionMenu}
              comment={comment}
              slug={slug}
              post_id={post_id}
              post={post}
            />
          </div>
        )}
      </div>
    </div>
  );
}
