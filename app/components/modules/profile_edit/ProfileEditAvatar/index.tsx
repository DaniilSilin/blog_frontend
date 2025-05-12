import React, { ChangeEvent } from "react";
import NextImage from "next/image";

// import AvatarCrop from "./AvatarCrop";

const MIN_DIMENSION_AVATAR = 100;
const MIN_AVATAR_SIZE_IN_MB = 33554432;
const AVATAR_SMALL_PATH = "/img/default/avatar_default.jpg";

import styles from "./profile_edit_avatar.module.css";

export interface Props {
  avatarState: any;
  isAvatarDeleted: boolean;
  setIsAvatarDeleted: any;
  setChosenFile: any;
  setImageErrorMessage: any;
  setCroppedAvatar: any;
  setCroppedAvatarUrl: any;
  handleDisplayModal: any;
  originalAvatarSource: any;
  setOriginalAvatarSource: any;
  originalAvatarSourceUrl: any;
  setOriginalAvatarSourceUrl: any;
}

const ProfileEditAvatar = React.forwardRef(function ProfileEditAvatar(
  {
    avatarState,
    isAvatarDeleted,
    setIsAvatarDeleted,
    setChosenFile,
    setImageErrorMessage,
    setCroppedAvatar,
    setCroppedAvatarUrl,
    handleDisplayModal,
    setOriginalAvatarSource,
    originalAvatarSourceUrl,
    setOriginalAvatarSourceUrl,
  }: Props,
  ref,
) {
  const onSelectAvatar = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setImageErrorMessage("");
      const file = e.target.files?.[0];
      if (!file) return;

      const fileSize = file?.size;
      if (fileSize >= MIN_AVATAR_SIZE_IN_MB) {
        setImageErrorMessage("Файл не может превышать размер 4 Мб!");
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          // @ts-ignore
          const width = e.currentTarget.width;
          // @ts-ignore
          const height = e.currentTarget.height;
          if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
            setChosenFile("avatar");
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setOriginalAvatarSource(undefined);
            setOriginalAvatarSourceUrl("");
          } else {
            setOriginalAvatarSource(file);
            setOriginalAvatarSourceUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [
      setOriginalAvatarSource,
      setOriginalAvatarSourceUrl,
      setChosenFile,
      setImageErrorMessage,
    ],
  );

  const deleteAvatar = React.useCallback(() => {
    setIsAvatarDeleted(true);
    setCroppedAvatarUrl("");
    setCroppedAvatar(undefined);
  }, [setCroppedAvatarUrl, setCroppedAvatar, setIsAvatarDeleted]);

  const handleUploadButtonClick = () => {
    // @ts-ignore
    document.getElementById("avatar-upload").click();
  };

  const handleUploadButtonClick2 = () => {
    // @ts-ignore
    document.getElementById("avatar-upload2").click();
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarContainerTitle}>Фото профиля</div>
      <div className={styles.bannerContainerDescription}>
        Фото профиля показывается, например, рядом с вашими видео или
        комментариями на сайте.
      </div>
      <div style={{ display: "flex", marginTop: "8px" }}>
        <div className={styles.avatarBackground}>
          <NextImage
            src={avatarState}
            className={styles.avatarImage}
            width={140}
            height={140}
            alt={""}
          />
        </div>
        <div className={styles.avatarUploadContainer}>
          <div className={styles.avatarGuide}>
            Рекомендуем использовать изображение размером не менее 98 х 98
            пикселей в формате PNG, JPEG или GIF. Анимированные картинки
            загружать нельзя. Размер файла – не более 4 МБ.
          </div>
          <div className={styles.avatarActionsContainer}>
            {avatarState === AVATAR_SMALL_PATH ||
            isAvatarDeleted.toString() === "true" ? (
              <div
                className={styles.avatarUploadButton}
                onClick={handleUploadButtonClick}
              >
                Загрузить
                <input
                  type={"file"}
                  accept="image/png,image/jpeg,image/gif"
                  onChange={onSelectAvatar}
                  id="avatar-upload"
                />
              </div>
            ) : (
              <>
                <button
                  className={styles.avatarUploadButton}
                  onClick={handleUploadButtonClick2}
                >
                  Изменить
                  <input
                    type={"file"}
                    accept="image/png,image/jpeg,image/gif"
                    onChange={onSelectAvatar}
                    id="avatar-upload2"
                  />
                </button>
                <button
                  onClick={deleteAvatar}
                  className={styles.avatarDeleteButton}
                >
                  Удалить
                </button>
              </>
            )}
            <div
              onClick={handleDisplayModal}
              style={{ overflow: "hidden" }}
              ref={ref}
              className="modal_3"
            >
              <div className="modalContent_3" style={{ margin: "10% auto" }}>
                {/*<AvatarCrop*/}
                {/*  originalAvatarSourceUrl={originalAvatarSourceUrl}*/}
                {/*  setOriginalAvatarSource={setOriginalAvatarSource}*/}
                {/*  setOriginalAvatarSourceUrl={setOriginalAvatarSourceUrl}*/}
                {/*  setCroppedAvatar={setCroppedAvatar}*/}
                {/*  setCroppedAvatarUrl={setCroppedAvatarUrl}*/}
                {/*  setIsAvatarDeleted={setIsAvatarDeleted}*/}
                {/*  ref={ref}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileEditAvatar;
