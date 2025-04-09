import React, { ChangeEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import NextImage from "next/image";
import classNames from "classnames";
import moment from "moment/moment";
import "moment/locale/ru";

import AvatarCrop from "@/app/components/modules/blog_edit/AvatarCrop";
import BannerCrop from "@/app/components/modules/blog_edit/BannerCrop";
import { UpdateInput } from "@/app/components/modules/form";
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  mapValidator,
} from "@/app/components/modules/form/validators";
import UpdateTextArea from "@/app/components/modules/form/UpdateTextArea";

import type { DatePickerProps } from "antd/lib";
import { DatePicker, Space } from "antd/lib";

import styles from "./profile_edit.module.css";
import Select from "@/app/components/modules/form/Select";
import genderList from "./constants";

const BASE_URL = "http://127.0.0.1:8000/";

const titleDescription =
  "Придумайте название канала, которое будет представлять вас и ваш контент. Если вы укажете другое название или " +
  "поменяете фото профиля, эти изменения будут видны только на YouTube. Изменить имя можно дважды в течение 14 дней. ";
const slugDescription =
  "Ваше имя пользователя. Менять имя пользователя нельзя.";
const descriptionDescription = "Придумайте описание для вашего блога.";
const emailDescription =
  ' Укажите, как связаться с вами по вопросам сотрудничества. Зрители могут увидеть адрес электронной почты на вкладке "О канале".';

const AVATAR_SMALL_PATH = "/img/default/avatar_default.jpg";
const BANNER_SMALL_PATH = "/img/default/banner.jpg";

const dateFormat = "YYYY-MM-DD";

const MIN_AVATAR_SIZE_IN_MB = 33554432;
const MIN_BANNER_SIZE_IN_MB = 50331648;
const MIN_DIMENSION_AVATAR = 100;
const MIN_HEIGHT_BANNER = 576;
const MIN_WIDTH_BANNER = 1024;

export default function ProfileEdit({ username }) {
  const { data } = DjangoService.useUserProfileQuery({ username });
  console.log(data);
  const [chosenFile, setChosenFile] = React.useState<string>("");

  const [changeUserProfile] = DjangoService.useChangeUserProfileMutation();
  const [deleteBlog] = DjangoService.useDeleteBlogMutation();

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

  const [initialFirstName, setInitialFirstName] = React.useState<
    string | undefined
  >();
  const [initialLastName, setInitialLastName] = React.useState<
    string | undefined
  >();
  const [initialTitle, setInitialTitle] = React.useState<string | undefined>();
  const [initialDescription, setInitialDescription] = React.useState<
    string | undefined
  >();
  const [initialEmail, setInitialEmail] = React.useState<string | undefined>();
  const [initialMap, setInitialMap] = React.useState<string | undefined>();
  const [initialGender, setInitialGender] = React.useState<
    string | undefined
  >();
  const [initialBirthDate, setInitialBirthDate] = React.useState<
    string | undefined
  >();

  const [firstName, setFirstName] = React.useState<string | undefined>(
    initialFirstName,
  );
  const [lastName, setLastName] = React.useState<string | undefined>(
    initialLastName,
  );
  const [title, setTitle] = React.useState<string | undefined>(initialTitle);
  const [description, setDescription] = React.useState<string | undefined>(
    initialDescription,
  );
  const [email, setEmail] = React.useState<string | undefined>(initialEmail);
  const [map, setMap] = React.useState<string | undefined>(initialMap);
  const [gender, setGender] = React.useState<string | undefined>(initialGender);
  const [birthDate, setBirthDate] = React.useState<string | undefined>(
    initialBirthDate,
  );

  const [firstNameError, setFirstNameError] = React.useState<string>("");
  const [lastNameError, setLastNameError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");

  const [hasPostChanged, setHasPostChanged] = React.useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = React.useState(false);

  console.log(data);

  React.useEffect(() => {
    if (data) {
      setInitialFirstName(data.first_name);
      setInitialLastName(data.last_name);
      setInitialDescription(data.description);
      setInitialEmail(data.email);
      setInitialGender(data.gender);
      setInitialBirthDate(data.date_of_birth);
      // setInitialMap(data.map)

      setInitialBannerOriginal(data.banner);
      setInitialBannerSmall(data.banner_small);
      setInitialAvatarOriginal(data.avatar);
      setInitialAvatarSmall(data.avatar_small);

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setTitle(data.title);
      setDescription(data.description);
      setEmail(data.email);
      setGender(data.gender);
      setBirthDate(data.date_of_birth);
    }
  }, [data]);

  const setToDefaultHandleChange = React.useCallback(() => {
    setCroppedAvatar(undefined);
    setCroppedAvatarUrl("");
    setCroppedBanner(undefined);
    setCroppedBannerUrl("");
    setIsBannerDeleted(false);
    setIsAvatarDeleted(false);

    setInitialFirstName(initialFirstName);
    setInitialLastName(initialLastName);
    setDescription(initialDescription);
    setEmail(initialEmail);
    setMap(initialMap);
    setGender(initialGender);
    setBirthDate(initialBirthDate);
  }, [
    initialFirstName,
    initialLastName,
    initialDescription,
    initialEmail,
    initialMap,
    initialGender,
    initialBirthDate,
    setInitialFirstName,
    setInitialLastName,
    setDescription,
    setEmail,
    setMap,
    setGender,
    setBirthDate,
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

    const email_value = validateField(email, emailValidator, setEmailError);

    return email_value;
  }, [title, email]);

  React.useEffect(() => {
    formValidator();
  }, [firstName, lastName, description, email]);

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
      gender === initialGender &&
      birthDate === initialBirthDate &&
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
    gender,
    birthDate,
    initialTitle,
    initialDescription,
    initialEmail,
    initialMap,
    initialGender,
    initialBirthDate,
    setHasPostChanged,
    initialAvatarSmall,
    avatarState,
    initialBannerSmall,
    bannerState,
  ]);

  const deleteBlogFunction = () => {};

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

  const userGenderHandleChange = React.useCallback(
    (value: string) => {
      setGender(value);
    },
    [setGender],
  );

  const dateHandleChange: DatePickerProps["onChange"] = React.useCallback(
    (date, dateString) => {
      console.log(date);
      console.log(dateString);
      setBirthDate(dateString);
    },
    [setBirthDate, birthDate],
  );

  const defaultBirthDateValue = initialBirthDate
    ? [moment(initialBirthDate), moment(initialBirthDate)]
    : undefined;
  console.log(defaultBirthDateValue);

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
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("gender", gender);
    // formData.append("date_of_birth", birthDate);
    changeUserProfile({ formData, username });
  };
  console.log(data);

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
          label={"Имя"}
          defaultValue={initialFirstName}
          error={firstNameError}
          value={firstName}
          onChange={setFirstName}
        />
        <UpdateInput
          width={400}
          height={40}
          label={"Фамилия"}
          defaultValue={initialLastName}
          error={lastNameError}
          value={lastName}
          onChange={setLastName}
        />
        <UpdateInput
          width={400}
          height={40}
          label={"Имя пользователя"}
          defaultValue={data.username}
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
        <Select
          data={genderList}
          defaultValue={initialGender}
          onChange={userGenderHandleChange}
          gender={gender}
          label={"Пол"}
        />
        <Space direction="vertical">
          <DatePicker
            onChange={dateHandleChange}
            defaultValue={defaultBirthDateValue}
            value={moment(birthDate)}
            format={dateFormat}
          />
        </Space>
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
