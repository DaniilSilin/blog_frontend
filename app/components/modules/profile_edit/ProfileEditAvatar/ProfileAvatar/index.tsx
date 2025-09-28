import React from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import classNames from "classnames";

import setCanvasPreview from "@/app/utils/CanvasPreview";
import DataUrlToFile from "@/app/utils/DataUrlToFile";

export interface Props {
  originalAvatarUrl: string;
  setOriginalAvatarUrl: (value: string) => void;
  setOriginalAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCroppedAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCroppedAvatarUrl: (value: string) => void;
}

import "react-image-crop/dist/ReactCrop.css";
import styles from "./profile_avatar.module.css";

const MIN_DIMENSION = 100;
const ASPECT_RATIO = 1;
// @ts-ignore
const AvatarCrop = React.forwardRef(function AvatarCrop(
  {
    originalAvatarUrl,
    setOriginalAvatarUrl,
    setOriginalAvatarFile,
    setCroppedAvatarFile,
    setCroppedAvatarUrl,
  }: Props,
  ref,
) {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = React.useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const cancelCrop = React.useCallback(() => {
    setOriginalAvatarUrl("");
    setOriginalAvatarFile(null);
  }, []);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
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
    setCrop(centeredCrop);
  };

  const cropImage = () => {
    if (!imgRef.current || !previewCanvasRef.current) return;
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );
    const dataUrl = previewCanvasRef.current.toDataURL("image/*");
    const file = DataUrlToFile(dataUrl, "croppedImage.jpeg");
    setCroppedAvatarFile(file);
    setCroppedAvatarUrl(dataUrl);
    // @ts-ignore
    ref.current.style.display = "none";
  };

  return (
    <div className={styles.root}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ReactCrop
          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          circularCrop
          crop={crop}
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img
            src={originalAvatarUrl}
            ref={imgRef}
            onLoad={onImageLoad}
            alt=""
          />
        </ReactCrop>
      </div>
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className={classNames("mt-4", styles.canvasStyle)}
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
