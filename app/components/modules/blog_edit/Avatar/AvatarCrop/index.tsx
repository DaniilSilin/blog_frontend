import React from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export interface Props {
  originalAvatarSourceUrl: string;
  setOriginalAvatarSource: any;
  setOriginalAvatarSourceUrl: any;
  setCroppedAvatar: any;
  setCroppedAvatarUrl: string;
  setIsAvatarDeleted: any;
}

import styles from "./avatar_crop.module.css";

const MIN_DIMENSION = 100;
const ASPECT_RATIO = 1;

const AvatarCrop = React.forwardRef(function AvatarCrop(
  {
    originalAvatarSourceUrl,
    setOriginalAvatarSource,
    setOriginalAvatarSourceUrl,
    setCroppedAvatar,
    setCroppedAvatarUrl,
    setIsAvatarDeleted,
  }: Props,
  ref,
) {
  const avatarRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const [crop, setCrop] = React.useState();

  const cancelCrop = React.useCallback(() => {
    setOriginalAvatarSourceUrl("");
    setOriginalAvatarSource(undefined);
    // @ts-ignore
    ref.current.style.display = "none";
  }, [setOriginalAvatarSourceUrl, setOriginalAvatarSource]);

  const onImageLoad = (e: any) => {
    const width = e.target.width;
    const height = e.target.height;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 50,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    // @ts-ignore
    setCrop(centeredCrop);
  };

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

  const cropImage = () => {
    setCanvasPreview(
      // @ts-ignore
      avatarRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        // @ts-ignore
        crop,
        // @ts-ignore
        avatarRef.current.width,
        // @ts-ignore
        avatarRef.current.height,
      ),
    );
    // @ts-ignore
    const dataUrl = previewCanvasRef.current.toDataURL();
    // @ts-ignore
    setCroppedAvatarUrl(dataUrl);
    const file = dataURLtoFile(dataUrl, "croppedImage.jpeg");
    setCroppedAvatar(file);
    setIsAvatarDeleted(false);
    // @ts-ignore
    ref.current.style.display = "none";
  };

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);
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
    ctx.restore();
  };

  return (
    <div className={styles.root}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ReactCrop
          // @ts-ignore
          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          circularCrop
          crop={crop}
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img
            src={originalAvatarSourceUrl}
            ref={avatarRef}
            onLoad={onImageLoad}
            alt=""
          />
        </ReactCrop>
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
      <div className={styles.actionButtonsContainer}>
        <button className={styles.cancelButton} onClick={cancelCrop}>
          Отмена
        </button>
        <button className={styles.cropButton} onClick={cropImage}>
          Готово
        </button>
      </div>
    </div>
  );
});

export default AvatarCrop;
