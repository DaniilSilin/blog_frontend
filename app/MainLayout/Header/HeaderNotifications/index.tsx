import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { NotificationType } from "@/app/types";

import { CiBellOn } from "react-icons/ci";

import styles from "./header_notifications.module.css";

const BASE_URL = "http://127.0.0.1:8000/";

export default function HeaderNotifications() {
  const user = useAppSelector((state) => state.django.profile);
  const { data: notificationList } = DjangoService.useNotificationListQuery({
    username: user.username,
  });

  const [displayNotificationListWindow, setDisplayNotificationListWindow] =
    React.useState(false);

  const displayWindow = React.useCallback(() => {
    setDisplayNotificationListWindow(!displayNotificationListWindow);
  }, [displayNotificationListWindow, setDisplayNotificationListWindow]);

  const [readNotification] = DjangoService.useReadNotificationMutation();

  const readNotificationFunction = ({ pk }) => {
    readNotification({ pk });
  };

  console.log(notificationList);

  return (
    <div onClick={displayWindow} className={styles.root}>
      <CiBellOn size={45} />
      {displayNotificationListWindow && (
        <div className={styles.notificationMenu}>
          <div
            style={{
              height: "49px",
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "600",
              borderBottom: "1px solid #535353",
            }}
          >
            <div style={{ marginLeft: "16px" }}>Уведомления</div>
          </div>
          <div style={{ overflowY: "scroll" }}>
            {notificationList.results.map(
              (notification: NotificationType, index: number) => (
                <div
                  key={index}
                  className={styles.notificationContainer}
                  onClick={() => readNotificationFunction(notification.pk)}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: "blue",
                        margin: "24px 5px",
                      }}
                    ></div>
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
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
