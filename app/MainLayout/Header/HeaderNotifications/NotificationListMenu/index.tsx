import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { NotificationType } from "@/app/types";
import NotificationListItem from "./NotificationListItem";

import styles from "./notification_list_menu.module.css";

export interface Props {
  setNotification: (value: NotificationType) => void;
  setDisplayCommentList: (value: boolean) => void;
  setDisplayNotificationListMenu: (value: boolean) => void;
}

export default function NotificationListMenu({
  setNotification,
  setDisplayCommentList,
  setDisplayNotificationListMenu,
}: Props) {
  const notificationListRef = React.useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state) => state.django.profile);

  const [page, setPage] = React.useState(1);

  const { data: notificationList, isFetching } =
    DjangoService.useNotificationListQuery({
      username: user.username,
      page,
    });

  React.useEffect(() => {
    if (notificationListRef.current) {
      const elem = notificationListRef.current;
      const onScroll = () => {
        const elem = notificationListRef.current;
        // @ts-ignore
        const scrolledToBottom = elem.scrollTopMax - elem.scrollTop >= 40;
        if (scrolledToBottom && !isFetching) {
          if (notificationList.next) {
            setPage((page) => page + 1);
          }
        }
      };

      elem.addEventListener("scroll", onScroll);
      return () => {
        elem.removeEventListener("scroll", onScroll);
      };
    }
  }, [notificationList, isFetching]);

  return (
    <>
      {notificationList ? (
        <div>
          <div className={styles.notificationHeaderContainer}>
            <div className={styles.notificationMenuTitle}>Уведомления</div>
          </div>
          <div
            className={styles.notificationListContainer}
            ref={notificationListRef}
          >
            {notificationList?.results.map((notification: NotificationType) => (
              <>
                <NotificationListItem
                  key={notification.id}
                  setNotification={setNotification}
                  notification={notification}
                  setDisplayCommentList={setDisplayCommentList}
                  setDisplayNotificationListMenu={
                    setDisplayNotificationListMenu
                  }
                />
              </>
            ))}
            {!!notificationList.next && (
              <div className={styles.nextNotificationsLoaderContainer}>
                <div className={"loader"}></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={"loader"}></div>
        </div>
      )}
    </>
  );
}
