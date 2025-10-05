import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NotificationType } from "@/app/types";

import { FaLongArrowAltLeft } from "react-icons/fa";
import NotificationCommentList from "./NotificationCommentList";

import styles from "./comment_reply.module.css";

export interface Props {
  notification: NotificationType | null;
  setDisplayCommentList: (value: boolean) => void;
  setDisplayNotificationListMenu: (value: boolean) => void;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function NotificationCommentListMenu({
  notification,
  setDisplayCommentList,
  setDisplayNotificationListMenu,
}: Props) {
  const toggle = React.useCallback(() => {
    setDisplayCommentList(false);
    setDisplayNotificationListMenu(true);
  }, []);

  return (
    <div className={styles.root}>
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
          href={`/blog/${notification?.post.blog.slug}/post/${notification?.post.post_id}/`}
        >
          <div className={styles.relatedPostText}>
            Комментарии к публикации &quot;{notification?.post.title}&quot;
          </div>
          <Image
            src={
              notification?.post.avatar_small
                ? `${BASE_URL}${notification?.post.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            className={styles.relatedPostAvatar}
            width={40}
            height={40}
            alt={""}
          />
        </Link>
      </div>
      <div className={styles.notificationRelatedCommentListContainer}>
        <NotificationCommentList
          width={40}
          height={40}
          slug={notification!.post.blog.slug}
          post_id={notification!.post.post_id}
          post={notification!.post}
          isParent
        />
      </div>
    </div>
  );
}
