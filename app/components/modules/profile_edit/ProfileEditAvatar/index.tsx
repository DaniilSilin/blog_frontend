import React, { ChangeEvent } from "react";
import NextImage from "next/image";
import classNames from "classnames";

const acceptImageTypes = "image/png,image/jpeg,image/gif";
const MIN_DIMENSION_AVATAR = 100;
const MIN_AVATAR_SIZE_IN_MB = 33554432;
const AVATAR_SMALL_PATH = "/img/default/avatar_default.jpg";

import ProfileAvatar from "./ProfileAvatar";

import styles from "./profile_edit_avatar.module.css";

export interface Props {
  setOriginalAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCroppedAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCroppedAvatarUrl: (value: string) => void;
  originalAvatarUrl: string | null;
  setOriginalAvatarUrl: (value: string) => void;
  avatarDeletedOrNotUploadedInitially: boolean;
  originalAvatarFile: File | null;
  croppedAvatarFile: File | null;
  setOriginalAvatarPath: any;
  setSmallAvatarPath: any;
  currentAvatarImage: any;

  setChosenFile: any;
  setImageErrorMessage: any;
}

export default function ProfileEditAvatar({
  setCroppedAvatarFile,
  avatarDeletedOrNotUploadedInitially,
  setOriginalAvatarFile,
  setCroppedAvatarUrl,
  originalAvatarUrl,
  setOriginalAvatarUrl,
  originalAvatarFile,
  croppedAvatarFile,
  setOriginalAvatarPath,
  setSmallAvatarPath,
  currentAvatarImage,

  setChosenFile,
  setImageErrorMessage,
}: Props) {
  const profileAvatarRef = React.useRef<HTMLDivElement | null>(null);

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
          const target = e.currentTarget as HTMLImageElement;
          if (!target) return;

          const width = target.width;
          const height = target.height;
          if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
            setChosenFile("avatar");
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setOriginalAvatarFile(null);
            setOriginalAvatarUrl("");
          } else {
            setOriginalAvatarFile(file);
            setOriginalAvatarUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [setOriginalAvatarFile, setOriginalAvatarUrl],
  );

  const deleteAvatar = React.useCallback(() => {
    setOriginalAvatarPath("");
    setSmallAvatarPath("");

    setOriginalAvatarFile(null);
    setCroppedAvatarFile(null);
    setCroppedAvatarUrl("");
    setCroppedAvatarFile(null);
  }, []);

  const handleUploadButtonClick = () => {
    document.getElementById("avatar-upload")?.click();
  };

  const handleUploadButtonClick2 = () => {
    document.getElementById("avatar-upload-2")?.click();
  };

  const handleHideModalContentClick = React.useCallback((e: any) => {
    let elem = e.target;
    if (elem.classList.contains("modal")) {
      elem.style.display = "none";
    }
  }, []);

  React.useEffect(() => {
    if (profileAvatarRef.current) {
      profileAvatarRef.current.style.display =
        originalAvatarFile && originalAvatarUrl ? "block" : "none";
    }
  }, [originalAvatarFile, originalAvatarUrl]);

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && profileAvatarRef.current) {
        profileAvatarRef.current.style.display = "none";
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.avatarContainerTitle}>Фото профиля</div>
      <div className={styles.avatarContainerDescription}>
        Фото профиля показывается, например, рядом с вашими видео или
        комментариями на сайте.
      </div>
      <div className={styles.avatarUploadContainer}>
        <div className={styles.avatarBackground}>
          <NextImage
            src={currentAvatarImage}
            className={styles.avatarImage}
            width={140}
            height={140}
            alt={""}
          />
        </div>
        <div className={styles.avatarGuideAndUploadContainer}>
          <div className={styles.avatarGuide}>
            Рекомендуем использовать изображение размером не менее 98 х 98
            пикселей в формате PNG, JPEG или GIF. Анимированные картинки
            загружать нельзя. Размер файла – не более 4 МБ.
          </div>
          <div className={styles.avatarActionsContainer}>
            {avatarDeletedOrNotUploadedInitially ? (
              <>
                <button
                  className={styles.avatarUploadButton}
                  onClick={handleUploadButtonClick2}
                >
                  Изменить
                  <input
                    type={"file"}
                    accept={acceptImageTypes}
                    onChange={onSelectAvatar}
                    id="avatar-upload-2"
                  />
                </button>
                <button
                  onClick={deleteAvatar}
                  className={styles.avatarDeleteButton}
                >
                  Удалить
                </button>
              </>
            ) : (
              <div
                className={styles.avatarUploadButton}
                onClick={handleUploadButtonClick}
              >
                Загрузить
                <input
                  type={"file"}
                  accept={acceptImageTypes}
                  onChange={onSelectAvatar}
                  id="avatar-upload"
                />
              </div>
            )}
            <div
              ref={profileAvatarRef}
              className={classNames("modal", styles.modalStyle)}
              onClick={handleHideModalContentClick}
            >
              <div className={classNames("modalContent", styles.modalStyle)}>
                <ProfileAvatar
                  // @ts-ignore
                  originalAvatarUrl={originalAvatarUrl}
                  setOriginalAvatarUrl={setOriginalAvatarUrl}
                  setOriginalAvatarFile={setOriginalAvatarFile}
                  setCroppedAvatarFile={setCroppedAvatarFile}
                  setCroppedAvatarUrl={setCroppedAvatarUrl}
                  ref={profileAvatarRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
