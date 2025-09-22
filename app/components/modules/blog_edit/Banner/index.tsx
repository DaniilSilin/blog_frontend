import React, { ChangeEvent } from "react";
import NextImage from "next/image";

import SelectImage from "@/app/contexts/SelectImage";
import BannerCrop from "./BannerCrop";

const MIN_BANNER_SIZE_IN_MB = 50331648;
const MIN_WIDTH_BANNER = 1024;
const MIN_HEIGHT_BANNER = 576;
const BANNER_SMALL_PATH = "/img/default/banner.jpg";

import styles from "./blog_banner_editor.module.css";

export interface Props {
  bannerState: any;
  isBannerDeleted: boolean;
  setIsBannerDeleted: (value: boolean) => void;
  setImageErrorMessage: any;
  setChosenFile: any;
  setCroppedBanner: any;
  setCroppedBannerUrl: any;
  handleDisplayModal: any;
  originalBannerSource: any;
  setOriginalBannerSource: any;
  originalBannerSourceUrl: any;
  setOriginalBannerSourceUrl: any;
  onSelectBannerImage: any;
}

const Banner = React.forwardRef(function Banner(
  {
    bannerState,
    isBannerDeleted,
    setIsBannerDeleted,
    setImageErrorMessage,
    setChosenFile,
    setCroppedBanner,
    setCroppedBannerUrl,
    handleDisplayModal,
    setOriginalBannerSource,
    originalBannerSourceUrl,
    setOriginalBannerSourceUrl,
    onSelectBannerImage,
  }: Props,
  ref,
) {
  // const onSelectBannerImage = React.useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     setImageErrorMessage("");
  //     const file = e.target.files?.[0];
  //     if (!file) return;
  //
  //     const fileSize = file?.size;
  //     if (fileSize >= MIN_BANNER_SIZE_IN_MB) {
  //       setImageErrorMessage("Максимальный размер изображения - 6 Мб.");
  //     }
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       const imageElement = new Image();
  //       const imageUrl = reader.result?.toString() || "";
  //       imageElement.src = imageUrl;
  //
  //       imageElement.addEventListener("load", (e) => {
  //         // @ts-ignore
  //         const width = e.currentTarget.width;
  //         // @ts-ignore
  //         const height = e.currentTarget.height;
  //         if (width < MIN_WIDTH_BANNER || MIN_HEIGHT_BANNER > height) {
  //           setChosenFile("banner");
  //           setImageErrorMessage(
  //             "Минимальный размер изображения – 1024 x 576 пикс.",
  //           );
  //           setOriginalBannerSource(undefined);
  //           setOriginalBannerSourceUrl("");
  //         } else {
  //           setOriginalBannerSource(file);
  //           setOriginalBannerSourceUrl(imageUrl);
  //         }
  //       });
  //     });
  //     reader.readAsDataURL(file);
  //   },
  //   [
  //     setOriginalBannerSource,
  //     setOriginalBannerSourceUrl,
  //     setImageErrorMessage,
  //     setChosenFile,
  //   ],
  // );

  const deleteBanner = React.useCallback(() => {
    setIsBannerDeleted(true);
    setCroppedBannerUrl("");
    setCroppedBanner(undefined);
  }, [setCroppedBannerUrl, setCroppedBanner, setIsBannerDeleted]);

  const handleUploadButtonClick = () => {
    const input = document.querySelector('input[type="file"]');
    // @ts-ignore
    if (input) input.click();
  };

  return (
    <div>
      <div className={styles.bannerContainerTitle}>Баннер</div>
      <div className={styles.bannerContainerDescription}>
        Это изображение показывается в верхней части страницы канала.
      </div>
      <div className={styles.bannerImageContainer}>
        <div className={styles.bannerBackground}>
          <NextImage
            src={bannerState}
            className={styles.bannerImage}
            width={175}
            height={100}
            alt={""}
          />
        </div>
        <div className={styles.avatarUploadContainer}>
          <div className={styles.bannerGuide}>
            Чтобы канал выглядел привлекательно, советуем загрузить изображение
            размером не менее 2048 x 1152 пикс. Размер файла – не более 6 МБ.
          </div>
          <div className={styles.bannerActionsContainer}>
            {bannerState === BANNER_SMALL_PATH ||
            isBannerDeleted.toString() === "true" ? (
              <button
                className={styles.bannerUploadButton}
                onClick={handleUploadButtonClick}
              >
                Загрузить
                <input
                  type={"file"}
                  accept="image/png,image/jpeg,image/gif"
                  onChange={onSelectBannerImage}
                />
              </button>
            ) : (
              <>
                <button
                  className={styles.bannerUploadButton}
                  onClick={handleUploadButtonClick}
                >
                  Изменить
                  <input
                    type={"file"}
                    accept="image/png,image/jpeg,image/gif"
                    onChange={onSelectBannerImage}
                  />
                </button>
                <button
                  onClick={deleteBanner}
                  className={styles.bannerDeleteButton}
                >
                  Удалить
                </button>
              </>
            )}
            <div
              onClick={handleDisplayModal}
              style={{ overflow: "hidden" }}
              // @ts-ignore
              ref={ref}
              className="modal_3"
            >
              <div
                className="modalContent_3"
                style={{
                  margin: "10% auto",
                  maxWidth: "960px",
                  width: "100%",
                  padding: "20px 30px",
                }}
              >
                <BannerCrop
                  originalBannerSourceUrl={originalBannerSourceUrl}
                  setOriginalBannerSource={setOriginalBannerSource}
                  setOriginalBannerSourceUrl={setOriginalBannerSourceUrl}
                  setCroppedBanner={setCroppedBanner}
                  setCroppedBannerUrl={setCroppedBannerUrl}
                  setIsBannerDeleted={setIsBannerDeleted}
                  ref={ref}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Banner;
