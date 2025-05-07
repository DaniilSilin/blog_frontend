import React from "react";
import Link from "next/link";
import Image from "next/image";

import { PostType } from "@/app/types";

import { CiBellOn } from "react-icons/ci";
import { FaLongArrowAltLeft } from "react-icons/fa";
import NotificationCommentList from "@/app/MainLayout/Header/HeaderNotifications/NotificationCommentList";

import styles from "./comment_reply.module.css";

export interface Props {
  slug: string;
  post: PostType;
  setDisplayCommentList: any;
  setDisplayNotificationListWindow: any;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function CommentReply({
  slug,
  post,
  setDisplayCommentList,
  setDisplayNotificationListWindow,
}: Props) {
  const toggle = React.useCallback(() => {
    setDisplayCommentList(false);
    setDisplayNotificationListWindow(true);
  }, [setDisplayNotificationListWindow, setDisplayNotificationListWindow]);

  return (
    <div className={styles.root}>
      <CiBellOn size={45} />
      <div className={styles.notificationMenu}>
        <div className={styles.notificationHeaderContainer}>
          <FaLongArrowAltLeft
            size={20}
            className={styles.arrow}
            onClick={toggle}
          />
          <div className={styles.headerTitle}>Комментарии</div>
        </div>
        <div className={styles.relatedPostContainer}>
          <Link
            className={styles.relatedPostSubContainer}
            href={`/blog/${slug}/post/${post.post_id}/`}
          >
            <div className={styles.relatedPostText}>
              Комментарии к публикации "{post.title}"
            </div>
            <Image
              src={
                post.avatar_small
                  ? `${BASE_URL}${post.avatar_small}`
                  : "/img/default/avatar_default.jpg"
              }
              className={styles.relatedPostAvatar}
              width={40}
              height={40}
              alt={""}
            />
          </Link>
        </div>
        <div style={{ padding: "16px 8px 16px 16px" }}>
          <NotificationCommentList
            width={40}
            height={40}
            slug={slug}
            post_id={post.post_id}
            post={post}
            isParent
          />
        </div>
      </div>
    </div>
  );
}
