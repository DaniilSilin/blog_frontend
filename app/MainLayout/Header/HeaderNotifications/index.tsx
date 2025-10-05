import React from "react";

import { NotificationType } from "@/app/types";
import { CiBellOn } from "react-icons/ci";

import NotificationListMenu from "./NotificationListMenu";
import NotificationCommentListMenu from "./NotificationCommentListMenu";

import styles from "./header_notifications.module.css";

export default function HeaderNotifications() {
  const notificationMenuRef = React.useRef<HTMLDivElement | null>(null);

  const [displayNotificationMenu, setDisplayNotificationMenu] =
    React.useState(false);
  const [displayCommentList, setDisplayCommentList] = React.useState(false);

  const [displayNotificationListMenu, setDisplayNotificationListMenu] =
    React.useState(false);

  const handleDisplayNotificationMenuClick = React.useCallback(() => {
    setDisplayNotificationMenu(
      (displayNotificationMenu) => !displayNotificationMenu,
    );
    if (displayCommentList) {
      setDisplayNotificationListMenu(false);
    } else {
      setDisplayNotificationListMenu(
        (displayNotificationListMenu) => !displayNotificationListMenu,
      );
    }
    setDisplayCommentList(false);
  }, [displayCommentList]);

  const [notification, setNotification] =
    React.useState<NotificationType | null>(null);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (notificationMenuRef.current) {
        const isClickInsideNotificationMenu =
          notificationMenuRef.current.contains(e.target as Node);
        if (!isClickInsideNotificationMenu && displayNotificationMenu) {
          setDisplayNotificationMenu(false);
          setDisplayNotificationListMenu(false);
          setDisplayCommentList(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  }, [displayNotificationMenu]);

  return (
    <div className={styles.root} ref={notificationMenuRef}>
      <button onClick={handleDisplayNotificationMenuClick}>
        <CiBellOn size={45} className={styles.bellIcon} />
      </button>
      {displayNotificationMenu && (
        <div className={styles.notificationMenu}>
          {displayNotificationListMenu && !displayCommentList && (
            <>
              <NotificationListMenu
                setNotification={setNotification}
                setDisplayCommentList={setDisplayCommentList}
                setDisplayNotificationListMenu={setDisplayNotificationListMenu}
              />
            </>
          )}
          {!displayNotificationListMenu && displayCommentList && (
            <>
              <NotificationCommentListMenu
                notification={notification}
                setDisplayCommentList={setDisplayCommentList}
                setDisplayNotificationListMenu={setDisplayNotificationListMenu}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
