import React, { ChangeEvent } from "react";
import Image from "next/image";

import { PiArrowsCounterClockwise } from "react-icons/pi";
import { MdSwapVert } from "react-icons/md";

import styles from "./post_image_item.module.css";

export interface Props {
  image: any;
  setImages: any;
  images: any;
}

export default function PostImageItem({ image, setImages, images }: Props) {
  const deleteImage = (item: any) => {
    const currentImage = images.filter((image) => image.name !== item.name);
    setImages(currentImage);
  };

  const reUploadImage = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const currentImage = images.find((image) => image.name === item.name);
    },
    [images],
  );

  const swapImages = React.useCallback(
    (item: any) => {
      const currentImage = images.find((image) => image.name === item.name);
      const currentImageIndex = images.indexOf(currentImage);
      const currentImageFindIndex = images.findIndex(
        (image) => image.name === item.name,
      );
    },
    [images],
  );

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <button className={styles.swapButton} onClick={swapImages}>
          <MdSwapVert size={15} />
        </button>
        <button
          className={styles.reUploadButton}
          onClick={(e) => reUploadImage(e, image)}
        >
          <PiArrowsCounterClockwise size={15} />
          <input type={"file"} accept={"image/*"} style={{ display: "none" }} />
        </button>
        <button
          className={styles.closeButton}
          onClick={() => deleteImage(image)}
        >
          x
        </button>
        <Image
          src={URL.createObjectURL(image)}
          height={150}
          width={150}
          alt={""}
        />
      </div>
    </div>
  );
}
