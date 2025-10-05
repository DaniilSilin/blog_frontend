import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { NotificationType } from "@/app/types";

import styles from "./notification_list_item.module.css";

export interface Props {
  notification: NotificationType;
  setNotification: (value: NotificationType) => void;
  setDisplayCommentList: (value: boolean) => void;
  setDisplayNotificationListMenu: (value: boolean) => void;
}

const BASE_URL = "http://127.0.0.1:8000/";

export default function NotificationListItem({
  notification,
  setNotification,
  setDisplayCommentList,
  setDisplayNotificationListMenu,
}: Props) {
  const [readNotification] = DjangoService.useReadNotificationMutation();
  // const [hideNotification] = DjangoService.useHideNotificationMutation();

  const handleReadNotificationClick = React.useCallback(() => {
    readNotification({ id: notification?.id });
    setNotification(notification);
    setDisplayCommentList(true);
    setDisplayNotificationListMenu(false);
  }, [setNotification, notification]);

  return (
    <div className={styles.root} onClick={handleReadNotificationClick}>
      <>
        {!notification.is_read ? (
          <div className={styles.notificationRenderer}></div>
        ) : (
          <div className={styles.notificationRendererIsRead}></div>
        )}
      </>
      <div className={styles.avatarContainer}>
        <Image
          src={
            notification.addressee.avatar_small
              ? `${BASE_URL}${notification.addressee.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          className={styles.avatar}
          width={48}
          height={48}
          alt={""}
        />
      </div>
      <div className={styles.notificationTextAndDateRenderer}>
        <div className={styles.textContainer}>{notification.text}</div>
        <div className={styles.notificationDate}>
          {moment(notification.created_at).fromNow()}
        </div>
      </div>
      <div className={styles.postContainer}>
        <Image
          src={
            notification.post.avatar_small
              ? `${BASE_URL}${notification.post.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          className={styles.avatar}
          width={40}
          height={40}
          alt={""}
        />
      </div>
    </div>
  );
}
