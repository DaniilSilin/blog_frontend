import React from "react";
import classNames from "classnames";

import styles from "./profile_delete_message_modal.module.css";

export interface Props {
  setDisplaySubmitDeleteBlogModal: (value: boolean) => void;
  handleDeleteAccountButtonClick: () => void;
}

export default function ProfileDeleteMessageModal({
  setDisplaySubmitDeleteBlogModal,
  handleDeleteAccountButtonClick,
}: Props) {
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalContentRef.current) {
        modalContentRef.current.style.display = "none";
        setDisplaySubmitDeleteBlogModal(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div ref={modalContentRef} className={"modal"}>
      <div
        className={classNames(
          "modalContent",
          styles.modalContentAdditionalStyles,
        )}
      >
        <div className={styles.deleteMessage}>
          Вы действительно хотите удалить аккаунт?
        </div>
        <div className={styles.deleteMessageButtons}>
          <div
            onClick={handleDeleteAccountButtonClick}
            className={styles.submitDeleteButton}
          >
            Да
          </div>
          <div className={classNames(styles.cancelDeleteButton, "close_5")}>
            Отмена
          </div>
        </div>
      </div>
    </div>
  );
}
