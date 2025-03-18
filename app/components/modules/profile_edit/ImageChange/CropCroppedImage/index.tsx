import React from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
  avatar: string;
  imageSourceUrl: string;
  username: string;
  sourceImage: any;
}

const ASPECT_RATION = 1;
const MIN_DIMENSION = 150;

export default function CropCroppedImage({
  avatar,
  imageSourceUrl,
  username,
  sourceImage,
}) {
  const [finalAvatar, setFinalAvatar] = React.useState("");
  const [dataUrl, setDataUrl] = React.useState("");
  const [changeAvatar] = DjangoService.useChangeAvatarMutation();
  const [crop, setCrop] = React.useState<any>();
  const [finalFile, setFinalFile] = React.useState<any>();
  const previewCanvasRef = React.useRef(null);
  const imgRef = React.useRef(null);

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

  const onCropChange = React.useCallback(
    (pixelCrop: any) => {
      setCrop(pixelCrop);
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
      const dataUrl = previewCanvasRef.current.toDataURL();
      setDataUrl(dataUrl);
    },
    [crop, setDataUrl],
  );

  const cropImage = () => {
    const file = dataURLtoFile(dataUrl, "croppedImage.jpeg");
    setFinalFile(file);
  };

  const finalCrop = () => {
    const formData = new FormData();
    formData.append("avatar", sourceImage);
    formData.append("avatar_small", finalFile);
    changeAvatar({ formData, username });
  };

  return (
    <div>
      <div>Выбор миниатюры</div>
      <div>
        Выберите область для маленьких фотографий. Выбранная миниатюра будет
        использоваться в новостях, личных сообщениях и комментариях.
      </div>
      <ReactCrop
        crop={crop}
        onChange={(pixelCrop, percentCrop) => onCropChange(pixelCrop)}
        circularCrop
        keepSelection
        aspect={ASPECT_RATION}
        minWidth={MIN_DIMENSION}
      >
        <img ref={imgRef} src={avatar} onLoad={onImageLoad} />
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
            borderRadius: "50%",
          }}
        />
      )}
      {avatar && (
        <img
          src={dataUrl}
          style={{ borderRadius: "50%", marginRight: "20px" }}
          width={40}
          height={40}
          alt=""
        />
      )}
      <div style={{ display: "flex" }}>
        <div onClick={cropImage}>Сохранить изменения</div>
        <div onClick={finalCrop}>123</div>
        <div>Вернуться назад</div>
      </div>
    </div>
  );
}
