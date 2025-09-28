import React from "react";

import styles from "./profile_upload_error_modal.module.css";

export interface Props {
  imageErrorMessage: string;
  chosenFile: any;
}

export default function ProfileUploadErrorModal({
  imageErrorMessage,
  chosenFile,
}: Props) {
  const uploadErrorRef = React.useRef<HTMLDivElement | null>(null);

  const handleDisplayModal = (e: any) => {
    let elem = e.target;
    if (elem.className === "modal_3" || elem.className === "cancel") {
      if (elem.className === "cancel") {
        elem = elem.parentNode.parentNode.parentNode;
      }
      elem.style.display = "none";
      // setImageErrorMessage("");
    }
  };

  React.useEffect(() => {
    if (uploadErrorRef.current && imageErrorMessage) {
      uploadErrorRef.current.style.display = "block";
    }
  }, [imageErrorMessage]);

  return (
    <div ref={uploadErrorRef} onClick={handleDisplayModal} className="modal_3">
      <div className={styles.modalContentError}>
        <div className={styles.messageTitle}>Ошибка</div>
        <div className={styles.message}>{imageErrorMessage}</div>
        <div className={styles.errorMessageActionContainer}>
          <button className={"cancel"}>Отмена</button>
          <button className={styles.retryErrorButton}>
            Повторить
            {chosenFile === "banner" && (
              <input
                type={"file"}
                accept="image/png,image/jpeg,image/gif"
                // onChange={onSelectBannerImage}
              />
            )}
            {chosenFile === "avatar" && (
              <input
                type={"file"}
                accept="image/png,image/jpeg,image/gif"
                // onChange={onSelectAvatar}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
