import React, { ChangeEvent } from "react";
import ImageCrop from "./ImageCrop";

export interface Props {
  avatar: any;
  setAvatar: (value: any) => null;
  avatarSmall: any;
  setAvatarSmall: (value: any) => null;
}

const MIN_DIMENSION = 1000;

export default function ImageUpload({
  avatar,
  setAvatar,
  avatarSmall,
  setAvatarSmall,
}: Props) {
  const [error, setError] = React.useState("");
  const fileUpload = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0];
      if (!image) return;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          const naturalHeight = e.target.naturalHeight;
          const naturalWidth = e.target.naturalWidth;
          if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Картинка должна быть как минимум 150x150 пикселей.");
            return setAvatarSmall("");
          }
        });
        setAvatarSmall(imageUrl);
      });
      reader.readAsDataURL(image);
    },
    [setAvatarSmall, setError],
  );

  if (avatarSmall && error) {
    return (
      <ImageCrop
        avatar={avatar}
        setAvatar={setAvatar}
        avatarSmall={avatarSmall}
        setAvatarSmall={setAvatarSmall}
        setError={setError}
        error={error}
      />
    );
  }

  return (
    <div>
      <div>Загрузите новое фото</div>
      <input type="file" accept="image/*" onChange={fileUpload} />
      <div>{error && <div>{error}</div>}</div>
    </div>
  );
}
