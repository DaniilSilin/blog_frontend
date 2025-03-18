import React, { ChangeEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import NextImage from "next/image";
import classNames from "classnames";

import AvatarCrop from "@/app/components/modules/blog_edit/AvatarCrop";
import BannerCrop from "@/app/components/modules/blog_edit/BannerCrop";
import { UpdateInput } from "@/app/components/modules/form";
import {
  emailValidator,
  mapValidator,
  titleValidator,
  vkValidator,
  telegramValidator,
  youtubeValidator,
  dzenValidator,
  ownSiteLinkValidator,
} from "@/app/components/modules/form/validators";
import UpdateTextArea from "@/app/components/modules/form/UpdateTextArea";
import PhoneInput from "@/app/components/modules/form/PhoneInput";

import styles from "./blog_edit.module.css";

const BASE_URL = "http://127.0.0.1:8000/";

const AVATAR_SMALL_PATH = "/img/default/avatar_default.jpg";
const BANNER_SMALL_PATH = "/img/default/banner.jpg";

const MIN_AVATAR_SIZE_IN_MB = 33554432;
const MIN_BANNER_SIZE_IN_MB = 50331648;
const MIN_DIMENSION_AVATAR = 100;
const MIN_HEIGHT_BANNER = 576;
const MIN_WIDTH_BANNER = 1024;

const titleDescription =
  "Придумайте название канала, которое будет представлять вас и ваш контент. Если вы укажете другое название или " +
  "поменяете фото профиля, эти изменения будут видны только на YouTube. Изменить имя можно дважды в течение 14 дней. ";
const slugDescription =
  "Ваше уникальный URL блога. Менять уникальный URL нельзя.";
const descriptionDescription = "Придумайте описание для вашего блога.";
const emailDescription =
  ' Укажите, как связаться с вами по вопросам сотрудничества. Зрители могут увидеть адрес электронной почты на вкладке "О канале".';

export default function BlogEdit({ slug }) {
  const { data, refetch: refetchBlog } = DjangoService.useGetBlogQuery({
    slug,
  });
  const [chosenFile, setChosenFile] = React.useState<string>("");

  const [deleteBlog] = DjangoService.useDeleteBlogMutation();
  const [updateBlog] = DjangoService.useUpdateBlogMutation();

  const avatarRef = React.useRef(null);
  const bannerRef = React.useRef(null);
  const uploadErrorRef = React.useRef(null);

  const [originalBannerSource, setOriginalBannerSource] =
    React.useState<File>();
  const [originalBannerSourceUrl, setOriginalBannerSourceUrl] =
    React.useState<string>("");

  const [croppedBanner, setCroppedBanner] = React.useState();
  const [croppedBannerUrl, setCroppedBannerUrl] = React.useState("");

  const [initialBannerSmall, setInitialBannerSmall] = React.useState<
    string | undefined
  >();
  const [initialBannerOriginal, setInitialBannerOriginal] = React.useState<
    string | undefined
  >();

  const [isBannerDeleted, setIsBannerDeleted] = React.useState(false);

  const [originalAvatarSource, setOriginalAvatarSource] =
    React.useState<File>();
  const [originalAvatarSourceUrl, setOriginalAvatarSourceUrl] =
    React.useState<string>("");

  const [croppedAvatar, setCroppedAvatar] = React.useState();
  const [croppedAvatarUrl, setCroppedAvatarUrl] = React.useState("");

  const [isAvatarDeleted, setIsAvatarDeleted] = React.useState(false);

  const [initialAvatarSmall, setInitialAvatarSmall] = React.useState<
    string | undefined
  >();
  const [initialAvatarOriginal, setInitialAvatarOriginal] = React.useState<
    string | undefined
  >();

  const [initialTitle, setInitialTitle] = React.useState<string | undefined>();
  const [initialDescription, setInitialDescription] = React.useState<
    string | undefined
  >();
  const [initialEmail, setInitialEmail] = React.useState<string | undefined>();
  const [initialMap, setInitialMap] = React.useState<string | undefined>();
  const [initialPhone, setInitialPhone] = React.useState<string | undefined>();
  const [initialVkLink, setInitialVkLink] = React.useState<
    string | undefined
  >();
  const [initialTelegramLink, setInitialTelegramLink] = React.useState<
    string | undefined
  >();
  const [initialYoutubeLink, setInitialYoutubeLink] = React.useState<
    string | undefined
  >();
  const [initialDzenLink, setInitialDzenLink] = React.useState<
    string | undefined
  >();
  const [initialOwnSiteLink, setInitialOwnSiteLink] = React.useState<
    string | undefined
  >();

  const [title, setTitle] = React.useState<string | undefined>(initialTitle);
  const [description, setDescription] = React.useState<string | undefined>(
    initialDescription,
  );
  const [email, setEmail] = React.useState<string | undefined>(initialEmail);
  const [map, setMap] = React.useState<string | undefined>(initialMap);
  const [phone, setPhone] = React.useState<string | undefined>(initialPhone);
  const [vkLink, setVkLink] = React.useState<string | undefined>(initialVkLink);
  const [telegramLink, setTelegramLink] = React.useState<string | undefined>(
    initialTelegramLink,
  );
  const [youtubeLink, setYoutubeLink] = React.useState<string | undefined>(
    initialYoutubeLink,
  );
  const [dzenLink, setDzenLink] = React.useState<string | undefined>(
    initialDzenLink,
  );
  const [ownSiteLink, setOwnSiteLink] = React.useState<string | undefined>(
    initialOwnSiteLink,
  );

  const [titleError, setTitleError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");
  const [vkLinkError, setVkLinkError] = React.useState<string>("");
  const [telegramLinkError, setTelegramLinkError] = React.useState<string>("");
  const [youtubeLinkError, setYoutubeLinkError] = React.useState<
    string | undefined
  >();
  const [dzenLinkError, setDzenLinkError] = React.useState<
    string | undefined
  >();
  const [ownSiteLinkError, setOwnSiteLinkError] = React.useState<
    string | undefined
  >();

  const [hasPostChanged, setHasPostChanged] = React.useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setInitialTitle(data.title);
      setInitialDescription(data.description);
      setInitialEmail(data.email);
      setInitialMap(data.map);
      setInitialPhone(data.phone_number);
      setInitialVkLink(data.vk_link);
      setInitialTelegramLink(data.telegram_link);
      setInitialYoutubeLink(data.youtube_link);
      setInitialDzenLink(data.dzen_link);
      setInitialOwnSiteLink(data.site_link);

      setInitialBannerOriginal(data.banner);
      setInitialBannerSmall(data.banner_small);
      setInitialAvatarOriginal(data.avatar);
      setInitialAvatarSmall(data.avatar_small);

      setTitle(data.title);
      setDescription(data.description);
      setEmail(data.email);
      setMap(data.map);
      setPhone(data.phone_number);
      setVkLink(data.vk_link);
      setTelegramLink(data.telegram_link);
      setYoutubeLink(data.youtube_link);
      setDzenLink(data.dzen_link);
      setOwnSiteLink(data.site_link);
    }
  }, [data]);

  const setToDefaultHandleChange = React.useCallback(() => {
    setCroppedAvatar(undefined);
    setCroppedAvatarUrl("");
    setCroppedBanner(undefined);
    setCroppedBannerUrl("");
    setIsBannerDeleted(false);
    setIsAvatarDeleted(false);

    setTitle(initialTitle);
    setDescription(initialDescription);
    setEmail(initialEmail);
    setMap(initialMap);
    setPhone(initialPhone);
    setVkLink(initialVkLink);
    setTelegramLink(initialTelegramLink);
    setYoutubeLink(initialYoutubeLink);
    setDzenLink(initialDzenLink);
    setOwnSiteLink(initialOwnSiteLink);
  }, [
    initialTitle,
    initialDescription,
    initialEmail,
    initialMap,
    initialPhone,
    initialVkLink,
    initialTelegramLink,
    initialYoutubeLink,
    initialDzenLink,
    initialOwnSiteLink,
    setTitle,
    setDescription,
    setEmail,
    setMap,
    setPhone,
    setVkLink,
    setTelegramLink,
    setYoutubeLink,
    setDzenLink,
    setOwnSiteLink,
    setIsBannerDeleted,
    setIsAvatarDeleted,
    setCroppedAvatar,
    setCroppedAvatarUrl,
    setCroppedBanner,
    setCroppedBannerUrl,
  ]);

  const [imageErrorMessage, setImageErrorMessage] = React.useState("");

  const formValidator = React.useCallback(() => {
    const validateField = (value, validator, setError) => {
      let isValid;
      const error = validator(value);

      if (error) {
        setError(error);
        isValid = false;
      } else {
        setError("");
        isValid = true;
      }
      return isValid;
    };

    const title_value = validateField(title, titleValidator, setTitleError);
    const email_value = validateField(email, emailValidator, setEmailError);
    const map_value = validateField(map, mapValidator, setMapError);
    const vk_value = validateField(vkLink, vkValidator, setVkLinkError);
    const tg_value = validateField(
      telegramLink,
      telegramValidator,
      setTelegramLinkError,
    );
    const youtube_value = validateField(
      youtubeLink,
      youtubeValidator,
      setYoutubeLinkError,
    );
    const dzen_value = validateField(dzenLink, dzenValidator, setDzenLinkError);
    const own_site_value = validateField(
      ownSiteLink,
      ownSiteLinkValidator,
      setOwnSiteLinkError,
    );

    return (
      title_value &&
      email_value &&
      map_value &&
      vk_value &&
      tg_value &&
      youtube_value &&
      dzen_value &&
      own_site_value
    );
  }, [
    title,
    email,
    map,
    vkLink,
    telegramLink,
    youtubeLink,
    dzenLink,
    ownSiteLink,
  ]);

  React.useEffect(() => {
    formValidator();
  }, [
    title,
    email,
    map,
    phone,
    vkLink,
    telegramLink,
    youtubeLink,
    dzenLink,
    ownSiteLink,
  ]);

  React.useEffect(() => {
    const isValid = formValidator();
    if (hasPostChanged && isValid) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [setIsReadyToSubmit, hasPostChanged, formValidator]);

  const bannerState = React.useMemo(() => {
    const defaultImage = "/img/default/banner.jpg";
    if (!initialBannerSmall && !(croppedBannerUrl && croppedBanner)) {
      return defaultImage;
    }
    if (isBannerDeleted) {
      return defaultImage;
    } else {
      if (croppedBannerUrl && croppedBanner) {
        return croppedBannerUrl;
      } else {
        return `${BASE_URL}${initialBannerSmall}`;
      }
    }
  }, [
    isBannerDeleted,
    croppedBannerUrl,
    croppedBanner,
    data,
    initialBannerSmall,
  ]);

  const avatarState = React.useMemo(() => {
    const defaultImage = "/img/default/avatar_default.jpg";
    if (!initialAvatarSmall && !(croppedAvatarUrl && croppedAvatar)) {
      return defaultImage;
    }
    if (isAvatarDeleted) {
      return defaultImage;
    } else {
      if (croppedAvatarUrl && croppedAvatar) {
        return croppedAvatarUrl;
      } else {
        return `${BASE_URL}${initialAvatarSmall}`;
      }
    }
  }, [
    isAvatarDeleted,
    croppedAvatarUrl,
    croppedAvatar,
    data,
    initialAvatarSmall,
  ]);

  const deleteBanner = React.useCallback(() => {
    setIsBannerDeleted(true);
    setCroppedBannerUrl("");
    setCroppedBanner(undefined);
  }, [setCroppedBannerUrl, setCroppedBanner, setIsBannerDeleted]);

  const deleteAvatar = React.useCallback(() => {
    setIsAvatarDeleted(true);
    setCroppedAvatarUrl("");
    setCroppedAvatar(undefined);
  }, [setCroppedAvatarUrl, setCroppedAvatar, setIsAvatarDeleted]);

  const onSelectBannerImage = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setImageErrorMessage("");
      const file = e.target.files?.[0];
      if (!file) return;

      const fileSize = file?.size;
      if (fileSize >= MIN_BANNER_SIZE_IN_MB) {
        setImageErrorMessage("Максимальный размер изображения - 6 Мб.");
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          const width = e.currentTarget.width;
          const height = e.currentTarget.height;
          if (width < MIN_WIDTH_BANNER || MIN_HEIGHT_BANNER > height) {
            setChosenFile("banner");
            setImageErrorMessage(
              "Минимальный размер изображения – 1024 x 576 пикс.",
            );
            setOriginalBannerSource(undefined);
            setOriginalBannerSourceUrl("");
          } else {
            setOriginalBannerSource(file);
            setOriginalBannerSourceUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [
      setOriginalBannerSource,
      setOriginalBannerSourceUrl,
      setImageErrorMessage,
      setChosenFile,
    ],
  );

  const onSelectAvatar = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setImageErrorMessage("");
      const file = e.target.files?.[0];
      if (!file) return;

      const fileSize = file?.size;
      if (fileSize >= MIN_AVATAR_SIZE_IN_MB) {
        setImageErrorMessage("Файл не может превышать размер 4 Мб!");
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          const width = e.currentTarget.width;
          const height = e.currentTarget.height;
          if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
            setChosenFile("avatar");
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setOriginalAvatarSource(undefined);
            setOriginalAvatarSourceUrl("");
          } else {
            setOriginalAvatarSource(file);
            setOriginalAvatarSourceUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [
      setOriginalAvatarSource,
      setOriginalAvatarSourceUrl,
      setChosenFile,
      setImageErrorMessage,
    ],
  );

  const handleDisplayModal = (e: any) => {
    let elem = e.target;
    if (elem.className === "modal_3" || elem.className === "cancel") {
      if (elem.className === "cancel") {
        elem = elem.parentNode.parentNode.parentNode;
      }
      elem.style.display = "none";
      setImageErrorMessage("");
    }
  };

  React.useEffect(() => {
    if (imageErrorMessage) {
      // @ts-ignore
      uploadErrorRef.current.style.display = "block";
    }
  }, [imageErrorMessage]);

  React.useEffect(() => {
    if (originalAvatarSource && originalAvatarSourceUrl) {
      // @ts-ignore
      uploadErrorRef.current.style.display = "none";
      // @ts-ignore
      avatarRef.current.style.display = "block";
    }
  }, [originalAvatarSource, originalAvatarSourceUrl]);

  React.useEffect(() => {
    if (originalBannerSource && originalBannerSourceUrl) {
      // @ts-ignore
      uploadErrorRef.current.style.display = "none";
      // @ts-ignore
      bannerRef.current.style.display = "block";
    }
  }, [originalBannerSource, originalBannerSourceUrl]);

  React.useEffect(() => {
    if (
      title === initialTitle &&
      description === initialDescription &&
      email === initialEmail &&
      initialMap === map &&
      initialPhone === phone &&
      initialVkLink === vkLink &&
      initialTelegramLink === telegramLink &&
      initialYoutubeLink === youtubeLink &&
      initialDzenLink === dzenLink &&
      initialOwnSiteLink === ownSiteLink &&
      initialBannerSmall === bannerState &&
      initialAvatarSmall === avatarState
    ) {
      setHasPostChanged(false);
    } else {
      setHasPostChanged(true);
    }
  }, [
    title,
    description,
    email,
    map,
    phone,
    vkLink,
    telegramLink,
    youtubeLink,
    dzenLink,
    ownSiteLink,
    initialTitle,
    initialDescription,
    initialEmail,
    initialMap,
    initialPhone,
    initialVkLink,
    initialTelegramLink,
    initialYoutubeLink,
    initialDzenLink,
    initialOwnSiteLink,
    setHasPostChanged,
    initialAvatarSmall,
    avatarState,
    initialBannerSmall,
    bannerState,
  ]);

  const deleteBlogFunction = () => {
    deleteBlog({ slug: slug });
  };

  const bannerOriginal = React.useMemo(() => {
    if (originalBannerSource) {
      return originalBannerSource;
    } else if (bannerState === "/img/default/banner.jpg") {
      return "";
    }
  }, [originalBannerSource, bannerState]);

  const avatarOriginal = React.useMemo(() => {
    if (originalAvatarSource) {
      return originalAvatarSource;
    } else if (avatarState === "/img/default/avatar_default.jpg") {
      return "";
    }
  }, [avatarState, originalAvatarSource]);

  const bannerSmall = React.useMemo(() => {
    if (croppedBanner) {
      return croppedBanner;
    } else if (bannerState === "/img/default/banner.jpg") {
      return "";
    }
  }, [croppedBanner, bannerState]);

  const avatarSmall = React.useMemo(() => {
    if (croppedAvatar) {
      return croppedAvatar;
    } else if (avatarState === "/img/default/avatar_default.jpg") {
      return "";
    }
  }, [croppedAvatar, avatarState]);

  const updateBlogData = async () => {
    const formData = new FormData();
    if (avatarState !== `${BASE_URL}${initialAvatarSmall}`) {
      formData.append("avatar", avatarOriginal);
      formData.append("avatar_small", avatarSmall);
    }
    if (bannerState !== `${BASE_URL}${initialBannerSmall}`) {
      formData.append("banner", bannerOriginal);
      formData.append("banner_small", bannerSmall);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("map", map);
    formData.append("vk_link", vkLink);
    formData.append("telegram_link", telegramLink);
    formData.append("youtube_link", youtubeLink);
    formData.append("dzen_link", dzenLink);
    formData.append("site_link", ownSiteLink);
    const result = await updateBlog({ formData, slug });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchBlog();
    }
  };

  return (
    <div>
      <div className={styles.tabTitle}>Настройки</div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContainerTitle}>Баннер</div>
        <div className={styles.bannerContainerDescription}>
          Это изображение показывается в верхней части страницы канала.
        </div>
        <div style={{ display: "flex", marginTop: "8px" }}>
          <div
            style={{
              width: "290px",
              height: "160px",
              backgroundColor: "#1f1f1f",
              alignItems: "center",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NextImage
              src={bannerState}
              style={{ border: "2px solid white" }}
              width={175}
              height={100}
              alt={""}
            />
          </div>
          <div className={styles.avatarUploadContainer}>
            <div className={styles.bannerGuide}>
              Чтобы канал выглядел привлекательно на всех устройствах, советуем
              загрузить изображение размером не менее 2048 x 1152 пикс. Размер
              файла – не более 6 МБ.
            </div>
            <div className={styles.bannerActionsContainer}>
              {bannerState === BANNER_SMALL_PATH ||
              isBannerDeleted.toString() === "true" ? (
                <button className={styles.bannerUploadButton}>
                  <label>
                    Загрузить
                    <input
                      type={"file"}
                      accept="image/png,image/jpeg,image/gif"
                      onChange={onSelectBannerImage}
                    />
                  </label>
                </button>
              ) : (
                <>
                  <button className={styles.bannerUploadButton}>
                    <label>
                      Изменить
                      <input
                        type={"file"}
                        accept="image/png,image/jpeg,image/gif"
                        style={{ cursor: "pointer" }}
                        onChange={onSelectBannerImage}
                      />
                    </label>
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
                ref={bannerRef}
                className="modal_3"
              >
                <div className="modalContent_3">
                  <BannerCrop
                    originalBannerSourceUrl={originalBannerSourceUrl}
                    setOriginalBannerSource={setOriginalBannerSource}
                    setOriginalBannerSourceUrl={setOriginalBannerSourceUrl}
                    setCroppedBanner={setCroppedBanner}
                    setCroppedBannerUrl={setCroppedBannerUrl}
                    setIsBannerDeleted={setIsBannerDeleted}
                    ref={bannerRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarContainerTitle}>Фото профиля</div>
          <div className={styles.bannerContainerDescription}>
            Фото профиля показывается, например, рядом с вашими видео или
            комментариями на сайте.
          </div>
          <div style={{ display: "flex", marginTop: "8px" }}>
            <div className={styles.avatarBackground}>
              <NextImage
                src={avatarState}
                className={styles.avatarImage}
                width={140}
                height={140}
                alt={""}
              />
            </div>
            <div className={styles.avatarUploadContainer}>
              <div className={styles.avatarGuide}>
                Рекомендуем использовать изображение размером не менее 98 х 98
                пикселей в формате PNG или GIF. Анимированные картинки загружать
                нельзя. Размер файла – не более 4 МБ.
              </div>
              <div className={styles.avatarActionsContainer}>
                {avatarState === AVATAR_SMALL_PATH ||
                isAvatarDeleted.toString() === "true" ? (
                  <div className={styles.avatarUploadButton}>
                    <label>
                      Загрузить
                      <input
                        type={"file"}
                        accept="image/png,image/jpeg,image/gif"
                        onChange={onSelectAvatar}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <button className={styles.avatarUploadButton}>
                      <label>
                        Изменить
                        <input
                          type={"file"}
                          accept="image/png,image/jpeg,image/gif"
                          onChange={onSelectAvatar}
                        />
                      </label>
                    </button>
                    <button
                      onClick={deleteAvatar}
                      className={styles.avatarDeleteButton}
                    >
                      Удалить
                    </button>
                  </>
                )}
                <div
                  onClick={handleDisplayModal}
                  ref={avatarRef}
                  className="modal_3"
                >
                  <div className="modalContent_3">
                    <AvatarCrop
                      originalAvatarSource={originalAvatarSource}
                      originalAvatarSourceUrl={originalAvatarSourceUrl}
                      setOriginalAvatarSource={setOriginalAvatarSource}
                      setOriginalAvatarSourceUrl={setOriginalAvatarSourceUrl}
                      croppedAvatar={croppedAvatar}
                      setCroppedAvatar={setCroppedAvatar}
                      croppedAvatarUrl={croppedAvatarUrl}
                      setCroppedAvatarUrl={setCroppedAvatarUrl}
                      setIsAvatarDeleted={setIsAvatarDeleted}
                      ref={avatarRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={uploadErrorRef}
          onClick={handleDisplayModal}
          className="modal_3"
        >
          <div className={styles.modalContentError}>
            <div
              style={{
                padding: "7px 8px 5px",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "28px",
              }}
            >
              Ошибка
            </div>
            <div style={{ paddingLeft: "24px", paddingRight: "24px" }}>
              <div>{imageErrorMessage}</div>
            </div>
            <div className={styles.errorMessageActionContainer}>
              <button className={"cancel"}>Отмена</button>
              <button className={styles.retryErrorButton}>
                <label style={{ cursor: "pointer" }}>
                  Повторить
                  {chosenFile === "banner" && (
                    <input
                      type={"file"}
                      accept="image/png,image/jpeg,image/gif"
                      style={{ display: "none" }}
                      onChange={onSelectBannerImage}
                    />
                  )}
                  {chosenFile === "avatar" && (
                    <input
                      type={"file"}
                      accept="image/png,image/jpeg,image/gif"
                      style={{ display: "none" }}
                      onChange={onSelectAvatar}
                    />
                  )}
                </label>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.otherFields}>
        <UpdateInput
          width={400}
          height={40}
          label={"Название блога"}
          defaultValue={initialTitle}
          error={titleError}
          value={title}
          onChange={setTitle}
          description={titleDescription}
        />
        <UpdateInput
          width={400}
          height={40}
          defaultValue={data?.slug}
          label={"Псевдоним"}
          description={slugDescription}
          disabled={true}
        />
        <UpdateTextArea
          width={400}
          height={100}
          label={"Описание"}
          defaultValue={initialDescription}
          value={description}
          onChange={setDescription}
          autoSize={true}
          showCount={true}
        />
        <UpdateInput
          width={400}
          height={40}
          defaultValue={initialEmail}
          label={"Адрес электронной почты"}
          value={email}
          onChange={setEmail}
          error={emailError}
          description={emailDescription}
        />
        <UpdateTextArea
          width={400}
          height={100}
          label={"Карта"}
          defaultValue={initialMap}
          value={map}
          onChange={setMap}
          error={mapError}
          autoSize={true}
          showCount={true}
        />
        <PhoneInput
          label={"Номер телефона"}
          defaultValue={initialPhone}
          value={phone}
          description={
            "Можете добавить номер телефона. Только Российские номера!"
          }
          onChange={setPhone}
        />
        <div>
          <div style={{ fontSize: "22px", marginBottom: "15px" }}>
            Ссылки на Веб-ресурсы
          </div>
          <UpdateInput
            width={400}
            height={40}
            label={"Ссылка на ВКонтакте"}
            defaultValue={initialVkLink}
            error={vkLinkError}
            value={vkLink}
            onChange={setVkLink}
          />
          <UpdateInput
            width={400}
            height={40}
            label={"Ссылка на Telegram"}
            defaultValue={initialTelegramLink}
            error={telegramLinkError}
            value={telegramLink}
            onChange={setTelegramLink}
          />
          <UpdateInput
            width={400}
            height={40}
            label={"Ссылка на Youtube"}
            defaultValue={initialYoutubeLink}
            error={youtubeLinkError}
            value={telegramLink}
            onChange={setYoutubeLink}
          />
          <UpdateInput
            width={400}
            height={40}
            label={"Ссылка на Дзен"}
            defaultValue={initialDzenLink}
            error={dzenLinkError}
            value={dzenLink}
            onChange={setDzenLink}
          />
          <UpdateInput
            width={400}
            height={40}
            label={"Ссылка на свой Веб-ресурс"}
            defaultValue={initialOwnSiteLink}
            error={ownSiteLinkError}
            value={ownSiteLink}
            onChange={setOwnSiteLink}
          />
        </div>
      </div>
      <div className={styles.actionButtonsContainer}>
        <button className={styles.deleteButton} onClick={deleteBlogFunction}>
          Удалить блог
        </button>
        <button
          className={classNames(styles.cancelButton, {
            [styles.active]: hasPostChanged,
          })}
          disabled={!hasPostChanged}
          onClick={setToDefaultHandleChange}
        >
          Отмена
        </button>
        <button
          className={classNames(styles.submitButton, {
            [styles.active]: isReadyToSubmit,
          })}
          disabled={!isReadyToSubmit}
          onClick={updateBlogData}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
