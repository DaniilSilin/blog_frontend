import React from "react";

import styles from "./profile_upload_error_modal.module.css";

export interface Props {
  imageErrorMessage: string;
  handleDisplayModal: any;
  chosenFile: any;
}

const ProfileUploadErrorModal = React.forwardRef(
  function ProfileUploadErrorModal(
    { imageErrorMessage, handleDisplayModal, chosenFile }: Props,
    ref,
  ) {
    React.useEffect(() => {
      if (imageErrorMessage) {
        // @ts-ignore
        ref.current.style.display = "block";
      }
    }, [imageErrorMessage]);

    return (
      // @ts-ignore
      <div ref={ref} onClick={handleDisplayModal} className="modal_3">
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
  },
);

export default ProfileUploadErrorModal;
