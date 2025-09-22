import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { NotificationType } from "@/app/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import CommentReply from "./CommentReply";

import styles from "./header_notifications.module.css";

const BASE_URL = "http://127.0.0.1:8000/";

export default function HeaderNotifications() {
  const notificationMenuRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const { data: notificationList } = DjangoService.useNotificationListQuery({
    username: user.username,
  });

  const [displayNotificationListWindow, setDisplayNotificationListWindow] =
    React.useState(false);
  const [displayCommentList, setDisplayCommentList] = React.useState(false);
  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState(false);

  const displayWindow = React.useCallback(() => {
    setDisplayNotificationListWindow(!displayNotificationListWindow);
  }, [displayNotificationListWindow, setDisplayNotificationListWindow]);

  const [readNotification] = DjangoService.useReadNotificationMutation();
  const [hideNotification] = DjangoService.useHideNotificationMutation();

  const [notification, setNotification] = React.useState(null);

  const readNotificationFunction = React.useCallback(
    (notificationData: NotificationType) => {
      // @ts-ignore
      setNotification(notificationData);
      readNotification({ pk: notificationData?.pk });
      setDisplayCommentList(true);
    },
    [setNotification, setDisplayCommentList],
  );

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (!notificationMenuRef.current.contains(e.target)) {
        setDisplayNotificationListWindow(false);
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  if (displayCommentList && notification) {
    return (
      <CommentReply
        // @ts-ignore
        slug={notification?.post.blog.slug}
        // @ts-ignore
        post={notification?.post}
        setDisplayCommentList={setDisplayCommentList}
        setDisplayNotificationListWindow={setDisplayNotificationListWindow}
      />
    );
  }

  return (
    <div
      onClick={displayWindow}
      className={styles.root}
      ref={notificationMenuRef}
    >
      <CiBellOn size={45} className={styles.bellIcon} />
      {displayNotificationListWindow && (
        <div className={styles.notificationMenu}>
          <div className={styles.notificationHeaderContainer}>
            <div style={{ marginLeft: "16px" }}>Уведомления</div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "430px" }}>
            {notificationList.results.map(
              (notification: NotificationType, index: number) => (
                <div
                  key={index}
                  className={styles.notificationContainer}
                  onClick={() => readNotificationFunction(notification)}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {!notification.is_read ? (
                      <div className={styles.notificationRenderer}></div>
                    ) : (
                      <div className={styles.notificationRendererIsRead}></div>
                    )}
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
                  </div>
                  <div>
                    <div className={styles.textContainer}>
                      {notification.text}
                    </div>
                    <div style={{ color: "#aaa", fontSize: "12px" }}>
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
                  <div style={{ width: "25px" }}>
                    <button>
                      <BsThreeDotsVertical size={20} />
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
