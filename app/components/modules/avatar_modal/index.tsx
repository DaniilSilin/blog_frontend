import React from "react";
import classNames from "classnames";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  convertToPixelCrop,
} from "react-image-crop";
import DataUrlToFile from "@/app/utils/DataUrlToFile";
import setCanvasPreview from "@/app/utils/CanvasPreview";

import "react-image-crop/dist/ReactCrop.css";
import styles from "./avatar_modal.module.css";

export interface Props {
  sourceImageFile: File | null;
  setSourceImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  sourceImageUrl: string;
  setCroppedImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCroppedImageUrl: (value: string) => void;
}

const ASPECT_RATION = 1;
const MIN_DIMENSION = 150;

export default function AvatarModal({
  sourceImageFile,
  setSourceImageFile,
  sourceImageUrl,
  setCroppedImageFile,
  setCroppedImageUrl,
}: Props) {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = React.useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
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

  const handleCancelButtonClick = React.useCallback(() => {
    setSourceImageFile(null);
  }, []);

  const handleSaveCroppedImageClick = React.useCallback(() => {
    if (!imgRef.current || !previewCanvasRef.current) return;
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );
    const dataUrl = previewCanvasRef.current.toDataURL("image/*");
    const file = DataUrlToFile(dataUrl, "croppedImage.jpeg");
    setCroppedImageUrl(dataUrl);
    setCroppedImageFile(file);
  }, [crop, imgRef.current, previewCanvasRef.current, setCanvasPreview]);

  return (
    <div className={styles.root}>
      {sourceImageFile && (
        <div className={styles.imageContainer}>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop) => setCrop(pixelCrop)}
            circularCrop
            keepSelection
            aspect={1}
            minWidth={150}
          >
            <img
              ref={imgRef}
              src={sourceImageUrl}
              onLoad={onImageLoad}
              alt=""
            />
          </ReactCrop>
        </div>
      )}
      <div className={styles.actionButtonsContainer}>
        <button
          className={styles.cancelButton}
          onClick={handleCancelButtonClick}
        >
          Отмена
        </button>
        <button
          className={styles.saveButton}
          onClick={handleSaveCroppedImageClick}
        >
          Готово
        </button>
      </div>
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className={classNames("mt-4", styles.canvasCrop)}
        />
      )}
    </div>
  );
}
