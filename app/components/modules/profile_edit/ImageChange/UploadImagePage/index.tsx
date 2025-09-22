import React from "react";
import CropSourceImage from "@/app/components/modules/profile_edit/ImageChange/CropSourceImage";

import styles from "./upload_image.module.css";

export interface Props {
  username: string;
}

const MIN_DIMENSION = 200;

export default function UploadImagePage({ username }: Props) {
  const [imageSourceUrl, setImageSourceUrl] = React.useState<any>("");
  const [sourceImage, setSourceImage] = React.useState<any>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const onSelectFile = React.useCallback(
    // @ts-ignore
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const imageElement = new Image();
        // @ts-ignore
        const imageUrl = reader.result.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          // @ts-ignore
          const height = e.currentTarget.height;
          // @ts-ignore
          const width = e.currentTarget.width;
          if (height < MIN_DIMENSION || width < MIN_DIMENSION) {
            setErrorMessage(
              "Фотография должна иметь размер не менее 200 точек в ширину и не менее 200 точек в высоту.",
            );
            return setImageSourceUrl("");
          }
        });
        setImageSourceUrl(imageUrl);
        setSourceImage(file);
      });
      reader.readAsDataURL(file);
    },
    [setImageSourceUrl],
  );

  if (imageSourceUrl) {
    return (
      <CropSourceImage
        imageSourceUrl={imageSourceUrl}
        username={username}
        sourceImage={sourceImage}
      />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.ownerAvatarEditHeader}>
        <div>Загрузка новой фотографии</div>
      </div>
      <div className={styles.ownerAvatarEditBody}>
        {errorMessage && (
          <div className={styles.ownerAvatarEditBodyErrorMessage}>
            <div>Произошла ошибка</div>
            {errorMessage}
          </div>
        )}
        <div className={styles.ownerAvatarEditBodyTitle}>
          Друзьям будет проще узнать вас, если вы загрузите свою настоящую
          фотографию. Вы можете загрузить изображение в формате JPG, GIF, PNG,
          WEBP или HEIC/HEIF.
        </div>
        <div className={styles.ownerAvatarEditorButton}>
          <input
            type={"file"}
            accept="image/png,image/jpeg,image/gif,image/heic,image/heif,image/webp"
            onChange={onSelectFile}
          />
        </div>
      </div>
      <div className={styles.ownerAvatarEditFooter}>
        Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию
        меньшего размера.
      </div>
    </div>
  );
}
