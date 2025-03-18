import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";

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
  console.log(notificationList);
  return (
    <div onClick={displayWindow} className={styles.root}>
      <CiBellOn size={45} />
      {displayNotificationListWindow && (
        <div className={styles.notificationMenu}>
          {notificationList.results.map((notification: any, index: number) => (
            <div key={index}>
              <div className={styles.notificationContainer}>
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
                <div className={styles.textContainer}>{notification.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
