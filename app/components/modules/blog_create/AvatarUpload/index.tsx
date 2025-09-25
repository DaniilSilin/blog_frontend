import React, { ChangeEvent } from "react";
import NextImage from "next/image";

import AvatarModal from "@/app/components/modules/avatar_modal";

import styles from "./avatar_upload.module.css";

const MIN_AVATAR_SIZE_IN_MB = 4194304;
const MIN_DIMENSION_AVATAR = 100;

export interface Props {
  sourceImageFile: File | null;
  setSourceImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  sourceImageUrl: string;
  setSourceImageUrl: (value: string) => void;
  setCroppedImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  croppedImageUrl: string | null;
  setCroppedImageUrl: (value: string) => void;
  setImageErrorMessage: (value: string) => void;
}

export default function AvatarUpload({
  sourceImageFile,
  setSourceImageFile,
  sourceImageUrl,
  setSourceImageUrl,
  setCroppedImageFile,
  croppedImageUrl,
  setCroppedImageUrl,
  setImageErrorMessage,
}: Props) {
  const divRef = React.useRef<HTMLDivElement | null>(null);

  //
  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.style.display = sourceImageFile ? "block" : "none";
    }
  }, [sourceImageFile]);

  React.useEffect(() => {
    if (!sourceImageFile) {
      setSourceImageUrl("");
    }
  }, [sourceImageFile]);

  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.style.display = "none";
    }
  }, [croppedImageUrl]);
  //

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && divRef.current) {
        divRef.current.style.display = "none";
        setSourceImageFile(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //
  const handleHideModalContentClick = React.useCallback((e: any) => {
    let elem = e.target;
    if (elem.className === "modal") {
      elem.style.display = "none";
      setSourceImageFile(null);
    }
  }, []);
  //

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
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setSourceImageFile(null);
            setSourceImageUrl("");
          } else {
            setSourceImageFile(file);
            setSourceImageUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [setSourceImageFile, setSourceImageUrl],
  );

  const handleUploadImageClick = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      onSelectAvatar(e);
    },
    [],
  );

  return (
    <div>
      <div className={styles.avatarContainer}>
        <label>
          <NextImage
            src={
              croppedImageUrl
                ? croppedImageUrl
                : "/img/default/avatar_default.jpg"
            }
            className={styles.avatar}
            width={100}
            height={100}
            alt={""}
          />
          <input
            className={styles.uploadButton}
            type={"file"}
            accept={"image/png, image/jpeg, image/gif"}
            onChange={handleUploadImageClick}
          />
        </label>
      </div>
      <div ref={divRef} onClick={handleHideModalContentClick} className="modal">
        <div className="modalContent" style={{ margin: "10% auto" }}>
          <AvatarModal
            sourceImageFile={sourceImageFile}
            setSourceImageFile={setSourceImageFile}
            sourceImageUrl={sourceImageUrl}
            setCroppedImageFile={setCroppedImageFile}
            setCroppedImageUrl={setCroppedImageUrl}
          />
        </div>
      </div>
    </div>
  );
}
