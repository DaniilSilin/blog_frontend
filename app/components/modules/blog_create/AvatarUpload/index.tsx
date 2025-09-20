import React, { ChangeEvent } from "react";
import NextImage from "next/image";

import AvatarModal from "@/app/components/modules/avatar_modal";

import styles from "./avatar_upload.module.css";

const MIN_AVATAR_SIZE_IN_MB = 4194304;
const MIN_DIMENSION_AVATAR = 100;

export interface Props {
  imageSource: string;
  setImageSource: any;
  imageSourceUrl: any;
  setImageSourceUrl: any;
  croppedImage: any;
  setCroppedImage: any;
  croppedImageUrl: any;
  setCroppedImageUrl: any;
  setImageErrorMessage: (value: string) => void;
}

export default function AvatarUpload({
  imageSource,
  setImageSource,
  imageSourceUrl,
  setImageSourceUrl,
  croppedImage,
  setCroppedImage,
  croppedImageUrl,
  setCroppedImageUrl,
  setImageErrorMessage,
}: Props) {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    if (imageSource) {
      // @ts-ignore
      divRef.current.style.display = "block";
    } else {
      // @ts-ignore
      divRef.current.style.display = "none";
    }
  }, [imageSource]);

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
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setImageSource(undefined);
            imageSourceUrl("");
          } else {
            setImageSource(file);
            setImageSourceUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [setCroppedImage, setImageSource, setImageErrorMessage],
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
            style={{ display: "none" }}
            type={"file"}
            accept={"image/*"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              onSelectAvatar(e);
            }}
          />
        </label>
      </div>
      <div ref={divRef} className="modal_3">
        <div className="modalContent_3" style={{ margin: "10% auto" }}>
          <AvatarModal
            setImageSource={setImageSource}
            imageSourceUrl={imageSourceUrl}
            setImageSourceUrl={setImageSourceUrl}
            setCroppedImageUrl={setCroppedImageUrl}
            imageSource={imageSource}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            ref={divRef}
          />
        </div>
      </div>
    </div>
  );
}
