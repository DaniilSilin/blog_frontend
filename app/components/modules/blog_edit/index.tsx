import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

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

import ActionBar from "./ActionBar";
import UploadErrorModal from "./UploadErrorModal";
import LinksToSocialMedia from "./LinksToSocialMedia";
import UpdateTextArea from "@/app/components/modules/form/UpdateTextArea";
import PhoneInput from "@/app/components/modules/form/PhoneInput";
import Banner from "@/app/components/modules/blog_edit/Banner";
import Avatar from "@/app/components/modules/blog_edit/Avatar";

const BASE_URL = "http://127.0.0.1:8000";

import SelectImage from "@/app/contexts/SelectImage";
import DataSentSuccessfullyNotification from "@/app/contexts/DataSentSuccessfully";

const emailDescription =
  ' Укажите, как связаться с вами. Зрители могут увидеть адрес электронной почты на вкладке "О канале".';

import styles from "./blog_edit.module.css";

export default function BlogEdit({ slug }) {
  const { data, refetch: refetchBlog } = DjangoService.useGetBlogQuery({
    slug,
  });

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
  const [imageErrorMessage, setImageErrorMessage] = React.useState("");
  const [chosenFile, setChosenFile] = React.useState<string>("");

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
      initialTitle === title &&
      initialDescription === description &&
      initialEmail === email &&
      initialMap === map &&
      initialPhone === phone &&
      initialVkLink === vkLink &&
      initialTelegramLink === telegramLink &&
      initialYoutubeLink === youtubeLink &&
      initialDzenLink === dzenLink &&
      initialOwnSiteLink === ownSiteLink
      //   bannerState === "/img/default/banner.jpg" &&
      //   initialBannerSmall === null) ||
      // `${BASE_URL}${initialBannerSmall}` === bannerState
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

  const createDataSentSuccessfullyNotification = React.useContext(
    DataSentSuccessfullyNotification,
  );

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
    const result = await updateBlog({ slug, formData });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchBlog();
      createDataSentSuccessfullyNotification();
    }
  };

  const [childFunction, setChildFunction] = React.useState(null);

  return (
    <div className={styles.root}>
      <div className={styles.tabTitle}>Настройки</div>
      <ActionBar
        slug={slug}
        hasPostChanged={hasPostChanged}
        isReadyToSubmit={isReadyToSubmit}
        updateBlogData={updateBlogData}
        setToDefaultHandleChange={setToDefaultHandleChange}
      />
      <SelectImage.Provider value={{ setChildFunction }}>
        <div>
          <div className={styles.bannerAndAvatarContainer}>
            <Banner
              bannerState={bannerState}
              isBannerDeleted={isBannerDeleted}
              setIsBannerDeleted={setIsBannerDeleted}
              setImageErrorMessage={setImageErrorMessage}
              setChosenFile={setChosenFile}
              setCroppedBanner={setCroppedBanner}
              setCroppedBannerUrl={setCroppedBannerUrl}
              handleDisplayModal={handleDisplayModal}
              originalBannerSource={originalBannerSource}
              setOriginalBannerSource={setOriginalBannerSource}
              originalBannerSourceUrl={originalBannerSourceUrl}
              setOriginalBannerSourceUrl={setOriginalBannerSourceUrl}
              ref={bannerRef}
            />
            <Avatar
              avatarState={avatarState}
              isAvatarDeleted={isAvatarDeleted}
              setIsAvatarDeleted={setIsAvatarDeleted}
              setImageErrorMessage={setImageErrorMessage}
              setChosenFile={setChosenFile}
              setCroppedAvatar={setCroppedAvatar}
              setCroppedAvatarUrl={setCroppedAvatarUrl}
              handleDisplayModal={handleDisplayModal}
              originalAvatarSource={originalAvatarSource}
              setOriginalAvatarSource={setOriginalAvatarSource}
              originalAvatarSourceUrl={originalAvatarSourceUrl}
              setOriginalAvatarSourceUrl={setOriginalAvatarSourceUrl}
              ref={avatarRef}
            />
          </div>
          <UploadErrorModal
            imageErrorMessage={imageErrorMessage}
            chosenFile={chosenFile}
            handleDisplayModal={handleDisplayModal}
            ref={uploadErrorRef}
          />
        </div>
      </SelectImage.Provider>
      <div className={styles.otherFields}>
        <UpdateInput
          width={400}
          height={40}
          label={"Название блога"}
          defaultValue={initialTitle}
          error={titleError}
          value={title}
          onChange={setTitle}
          description={
            "Придумайте название канала, которое будет представлять вас и ваш контент."
          }
        />
        <UpdateInput
          width={400}
          height={40}
          defaultValue={data?.slug}
          label={"Псевдоним"}
          description={
            "Ваше уникальный URL блога. Менять уникальный URL нельзя."
          }
          disabled={true}
        />
        <UpdateTextArea
          width={400}
          height={100}
          maxLength={300}
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
          maxLength={300}
          label={"Карта"}
          defaultValue={initialMap}
          value={map}
          onChange={setMap}
          error={mapError}
          autoSize={true}
          showCount={true}
        />
        <div>
          <a href={`https://yandex.ru/map-constructor/`} target={"_blank"}>
            Вставьте карту через сервис Яндекса
          </a>
        </div>
        <PhoneInput
          label={"Номер телефона"}
          defaultValue={initialPhone}
          value={phone}
          description={
            "Можете добавить номер телефона. Только Российские номера!"
          }
          onChange={setPhone}
        />
        <LinksToSocialMedia
          initialVkLink={initialVkLink}
          vkLinkError={vkLinkError}
          vkLink={vkLink}
          setVkLink={setVkLink}
          initialTelegramLink={initialTelegramLink}
          telegramLinkError={telegramLinkError}
          telegramLink={telegramLink}
          setTelegramLink={setTelegramLink}
          initialYoutubeLink={initialYoutubeLink}
          youtubeLinkError={youtubeLinkError}
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
          initialDzenLink={initialDzenLink}
          dzenLinkError={dzenLinkError}
          dzenLink={dzenLink}
          setDzenLink={setDzenLink}
          initialOwnSiteLink={initialOwnSiteLink}
          ownSiteLinkError={ownSiteLinkError}
          ownSiteLink={ownSiteLink}
          setOwnSiteLink={setOwnSiteLink}
        />
      </div>
    </div>
  );
}
