import React from "react";

import styles from "./upload_error_modal.module.css";

export interface Props {
  imageErrorMessage: string;
  handleDisplayModal: any;
  chosenFile: any;
  onSelectBannerImage: any;
  onSelectAvatar: any;
  setImageErrorMessage: any;
}

const UploadErrorModal = React.forwardRef(function UploadErrorModal(
  {
    imageErrorMessage,
    handleDisplayModal,
    chosenFile,
    onSelectBannerImage,
    onSelectAvatar,
    setImageErrorMessage,
  }: Props,
  ref,
) {
  React.useEffect(() => {
    if (imageErrorMessage) {
      // @ts-ignore
      ref.current.style.display = "block";
    } else {
      setImageErrorMessage(false);
      // @ts-ignore
      // ref.current.style.display = "none";
    }
  }, [imageErrorMessage]);

  const handleUploadButtonClick = () => {
    const input = document.querySelector('input[type="file"]');
    // @ts-ignore
    if (input) input.click();
  };

  return (
    // @ts-ignore
    <div ref={ref} onClick={handleDisplayModal} className="modal_3">
      <div className={styles.modalContentError}>
        <div className={styles.messageTitle}>Ошибка</div>
        <div className={styles.message}>{imageErrorMessage}</div>
        <div className={styles.errorMessageActionContainer}>
          <button className={"cancel"}>Отмена</button>
          <button
            className={styles.retryErrorButton}
            onClick={handleUploadButtonClick}
          >
            Повторить
            {chosenFile === "banner" && (
              <input
                type={"file"}
                accept="image/png,image/jpeg,image/gif"
                onChange={onSelectBannerImage}
              />
            )}
            {chosenFile === "avatar" && (
              <input
                type={"file"}
                accept="image/png,image/jpeg,image/gif"
                onChange={onSelectAvatar}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default UploadErrorModal;
