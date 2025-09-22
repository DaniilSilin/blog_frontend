import React from "react";
import NextImage from "next/image";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import styles from "./avatar_modal.module.css";

export interface Props {
  setImageSource: (value: any) => void;
  imageSource: any;
  croppedImage: any;
  setCroppedImage: (value: any) => void;
  imageSourceUrl: string;
  setImageSourceUrl: any;
  setCroppedImageUrl: any;
}

const ASPECT_RATION = 1;
const MIN_DIMENSION = 150;

const AvatarModal = React.forwardRef(function AvatarModal(
  {
    setImageSource,
    imageSource,
    setCroppedImage,
    imageSourceUrl,
    setCroppedImageUrl,
  }: Props,
  ref,
) {
  const imgRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const [crop, setCrop] = React.useState<any>();

  const dataURLtoFile = (dataUrl: any, filename: any) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const onImageLoad = (e: any) => {
    const width = e.target.width;
    const height = e.target.height;
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_DIMENSION,
      },
      ASPECT_RATION,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: any,
  ) => {
    const setCanvasPreview = (
      image: any, // HTMLImageElement
      canvas: { getContext: (arg0: string) => any }, // HTMLCanvasElement
      crop: any, // PixelCrop
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("232");
      }
    };
    const ctx = canvas.getContext("2d");

    const PixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * PixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * PixelRatio);

    // @ts-ignore
    ctx.scale(PixelRatio, PixelRatio);
    // @ts-ignore
    ctx.imageSmoothingQuality = "high";
    // @ts-ignore
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    // @ts-ignore
    ctx.translate(-cropX, -cropY);
    // @ts-ignore
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    );
    // @ts-ignore
    ctx.restore();
  };

  const onCancelButton = () => {
    setImageSource("");
  };

  const saveImage = () => {
    setCanvasPreview(
      // @ts-ignore
      imgRef.current,
      previewCanvasRef.current,
      // @ts-ignore
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );
    // @ts-ignore
    const dataUrl = previewCanvasRef.current.toDataURL();
    setCroppedImageUrl(dataUrl);
    const file = dataURLtoFile(dataUrl, "croppedImage.jpeg");
    setCroppedImage(file);
    // @ts-ignore
    ref.current.style.display = "none";
  };

  return (
    <div>
      {imageSource && (
        <div style={{ padding: "25px 25px" }}>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
              circularCrop
              keepSelection
              aspect={1}
              minWidth={150}
            >
              <img
                ref={imgRef}
                src={imageSourceUrl}
                alt=""
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        </div>
      )}
      <div className={styles.actionButtonsContainer}>
        <button className={styles.cancelButton} onClick={onCancelButton}>
          Отмена
        </button>
        <button className={styles.saveButton} onClick={saveImage}>
          Готово
        </button>
      </div>
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
});

export default AvatarModal;
