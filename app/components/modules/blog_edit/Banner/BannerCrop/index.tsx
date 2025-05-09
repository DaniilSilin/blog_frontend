import React from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import styles from "./banner_crop.module.css";

export interface Props {
  originalBannerSourceUrl: string;
  setOriginalBannerSourceUrl: any;
  setOriginalBannerSource: any;
  setCroppedBanner: any;
  setCroppedBannerUrl: any;
  setIsBannerDeleted: any;
}

const MIN_WIDTH_DIMENSION = 1024;
const MIN_HEIGHT_DIMENSION = 576;
const ASPECT_RATIO = 1;

const BannerCrop = React.forwardRef(function BannerCrop(
  {
    originalBannerSourceUrl,
    setOriginalBannerSourceUrl,
    setOriginalBannerSource,
    setCroppedBanner,
    setCroppedBannerUrl,
    setIsBannerDeleted,
  }: Props,
  ref,
) {
  const bannerRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const [crop, setCrop] = React.useState();

  const cancelCrop = React.useCallback(() => {
    setOriginalBannerSourceUrl("");
    setOriginalBannerSource(undefined);
    ref.current.style.display = "none";
  }, [setOriginalBannerSourceUrl, setOriginalBannerSource]);

  const onImageLoad = (e) => {
    const width = e.target.width;
    const height = e.target.height;
    const cropWidthInPercent = MIN_WIDTH_DIMENSION;
    const cropHeightInPercent = MIN_HEIGHT_DIMENSION;

    const crop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_WIDTH_DIMENSION,
        height: MIN_HEIGHT_DIMENSION,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, 300, 100);
    setCrop(centeredCrop);
  };

  const dataURLtoFile = (dataUrl, filename) => {
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
      bannerRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        crop,
        bannerRef.current.width,
        bannerRef.current.height,
      ),
    );
    const dataUrl = previewCanvasRef.current.toDataURL();
    setCroppedBannerUrl(dataUrl);
    const file = dataURLtoFile(dataUrl, "croppedImage.jpeg");
    setCroppedBanner(file);
    setIsBannerDeleted(false);
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
    <div>
      <ReactCrop
        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
        crop={crop}
        keepSelection
        aspect={ASPECT_RATIO}
        minWidth={MIN_WIDTH_DIMENSION}
        minHeight={MIN_HEIGHT_DIMENSION}
      >
        <img
          style={{ height: "500px", width: "900px" }}
          src={originalBannerSourceUrl}
          ref={bannerRef}
          onLoad={onImageLoad}
          alt=""
        />
      </ReactCrop>
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 1024,
            height: 576,
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

export default BannerCrop;
