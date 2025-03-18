import React from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import UploadImagePage from "@/app/components/modules/profile_edit/ImageChange/UploadImagePage";
import CropCroppedImage from "@/app/components/modules/profile_edit/ImageChange/CropCroppedImage";

export interface Props {
  imageSourceUrl: string;
  username: string;
  sourceImage: any;
}

const ASPECT_RATION = 1;
const MIN_DIMENSION = 200;

export default function CropSourceImage({
  imageSourceUrl,
  username,
  sourceImage,
}: Props) {
  const imgRef = React.useRef(null);
  const [crop, setCrop] = React.useState<any>();
  const [avatar, setAvatar] = React.useState();
  const [previous, setPrevious] = React.useState();
  const previewCanvasRef = React.useRef(null);

  const setCanvasPreview = (image, canvas, crop) => {
    const setCanvasPreview = (
      image, // HTMLImageElement
      canvas, // HTMLCanvasElement
      crop, // PixelCrop
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

    ctx.scale(PixelRatio, PixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleX;

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

  const onImageLoad = (e) => {
    const width = e.target.width;
    const height = e.target.height;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATION,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const cropImage = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );
    const dataUrl = previewCanvasRef.current.toDataURL();
    setAvatar(dataUrl);
  };

  if (avatar) {
    return (
      <CropCroppedImage
        avatar={avatar}
        imageSourceUrl={imageSourceUrl}
        username={username}
        sourceImage={sourceImage}
      />
    );
  }

  if (previous) {
    return <UploadImagePage username={username} />;
  }

  return (
    <div>
      <div>Фотография на вашей странице</div>
      <div>
        Выбранная область будет показываться на вашей странице. Если изображение
        ориентировано неправильно, фотографию можно повернуть.
      </div>
      <ReactCrop
        crop={crop}
        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
        keepSelection
        aspect={ASPECT_RATION}
        minWidth={MIN_DIMENSION}
      >
        <img ref={imgRef} src={imageSourceUrl} onLoad={onImageLoad} />
      </ReactCrop>
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
      <div onClick={cropImage}>Сохранить и продолжить</div>
      <div onClick={() => setPrevious(true)}>Вернуться назад</div>
    </div>
  );
}
