import React, { ChangeEvent } from "react";
import { GoPaperclip } from "react-icons/go";

import PostImageItem from "@/app/components/modules/post_create/ImagesContainer/PostImageItem";

import styles from "./images_container.module.css";

export interface Props {
  images: any;
  setImages: any;
}

export default function ImagesContainer({ images, setImages }: Props) {
  const uploadImages = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) setImages(Array.from(files).slice(0, 10));
      const fileReader = new FileReader();
    },
    [setImages],
  );
  console.log(images);

  const handleUploadButtonClick = () => {
    const input = document.querySelector('input[type="file"]');
    if (input) input.click();
  };

  const countOfImagesTitle = React.useMemo(() => {
    // @ts-ignore
    const countOfImages = images?.length.toString();
    if (images?.length > 0) {
      if (countOfImages.slice(-1) === "1" && countOfImages.slice(-2) !== "11") {
        return `${countOfImages} изображение выбрано`;
      } else if (
        (countOfImages.slice(-1) === "2" ||
          countOfImages.slice(-1) === "3" ||
          countOfImages.slice(-1) === "4") &&
        countOfImages.slice(-2) !== "12" &&
        countOfImages.slice(-2) !== "13" &&
        countOfImages.slice(-2) !== "14"
      ) {
        return `${countOfImages} изображения выбрано`;
      } else {
        return `${countOfImages} изображений выбрано`;
      }
    }
  }, [images?.length]);

  return (
    <div>
      <div className={styles.uploadContainer}>
        <button
          className={styles.uploadButton}
          onClick={handleUploadButtonClick}
        >
          <GoPaperclip size={20} className={styles.icon} />
          <span>Загрузите изображения</span>
          <input
            type={"file"}
            multiple
            accept={"image/*"}
            onChange={uploadImages}
            style={{ display: "none" }}
          />
        </button>
      </div>
      {images?.length > 0 && (
        <div className={styles.imagesContainer}>
          {images?.length > 0 && (
            <div className={styles.chosenImagesTitle}>{countOfImagesTitle}</div>
          )}
          <div style={{ display: "flex" }}>
            {images?.map((image: any, index: number) => (
              <PostImageItem
                key={index}
                image={image}
                images={images}
                setImages={setImages}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
