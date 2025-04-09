import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

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
              (notification: any, index: number) => (
                <div key={index} className={styles.notificationContainer}>
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "2px",
                      margin: "22px 6px 0",
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
                      width={40}
                      height={40}
                      alt={""}
                    />
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
