import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { UpdateInput } from "@/app/components/modules/form";
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
} from "@/app/components/modules/form/validators";
import UpdateTextArea from "@/app/components/modules/form/UpdateTextArea";

import validateField from "@/app/utils/validator";
import Select from "@/app/components/modules/form/Select";
import genderList from "./constants";
import ProfileEditActionBar from "./ProfileEditActionBar";
import ProfileEditBanner from "./ProfileEditBanner";
import ProfileEditAvatar from "./ProfileEditAvatar";
import ProfileUploadErrorModal from "./ProfileUploadErrorModal";

const BASE_URL = "http://127.0.0.1:8000/";

import styles from "./profile_edit.module.css";

const descriptionDescription = "Придумайте описание для вашего блога.";
const emailDescription =
  ' Укажите, как связаться с вами по вопросам сотрудничества. Зрители могут увидеть адрес электронной почты на вкладке "О канале".';

const pathToImage = "/img/default/avatar_default.jpg";
const defaultImage = `${BASE_URL}${pathToImage}`;

export interface Props {
  username: string;
}

export default function ProfileEdit({ username }: Props) {
  const { data } = DjangoService.useUserProfileQuery({ username });
  const [chosenFile, setChosenFile] = React.useState<string>("");

  const [changeUserProfile] = DjangoService.useChangeUserProfileMutation();

  const [originalBannerFile, setOriginalBannerFile] =
    React.useState<File | null>(null);
  const [originalBannerUrl, setOriginalBannerUrl] = React.useState<
    string | null
  >(null);

  const [croppedBannerFile, setCroppedBannerFile] = React.useState<File | null>(
    null,
  );
  const [croppedBannerUrl, setCroppedBannerUrl] = React.useState<string | null>(
    null,
  );

  const [isBannerDeleted, setIsBannerDeleted] = React.useState(false);

  const [originalAvatarFile, setOriginalAvatarFile] =
    React.useState<File | null>(null);
  const [originalAvatarUrl, setOriginalAvatarUrl] = React.useState<
    string | null
  >(null);

  const [croppedAvatarFile, setCroppedAvatarFile] = React.useState<File | null>(
    null,
  );
  const [croppedAvatarUrl, setCroppedAvatarUrl] = React.useState<string | null>(
    null,
  );

  const [initialSmallBannerPath, setInitialSmallBannerPath] = React.useState();
  const [initialOriginalBannerPath, setInitialOriginalBannerPath] =
    React.useState();

  const [initialSmallAvatarPath, setInitialSmallAvatarPath] = React.useState();
  const [initialOriginalAvatarPath, setInitialOriginalAvatarPath] =
    React.useState();

  const [initialFirstName, setInitialFirstName] = React.useState<
    string | undefined
  >();
  const [initialLastName, setInitialLastName] = React.useState<
    string | undefined
  >();
  const [initialDescription, setInitialDescription] = React.useState<
    string | undefined
  >();
  const [initialEmail, setInitialEmail] = React.useState<string | undefined>();
  const [initialGender, setInitialGender] = React.useState<
    string | undefined
  >();

  const [originalAvatarPath, setOriginalAvatarPath] = React.useState(
    initialOriginalAvatarPath,
  );

  const [smallAvatarPath, setSmallAvatarPath] = React.useState(
    initialSmallAvatarPath,
  );

  const [firstName, setFirstName] = React.useState<string | undefined>(
    initialFirstName,
  );
  const [lastName, setLastName] = React.useState<string | undefined>(
    initialLastName,
  );
  const [description, setDescription] = React.useState<string | undefined>(
    initialDescription,
  );
  const [email, setEmail] = React.useState<string | undefined>(initialEmail);
  const [gender, setGender] = React.useState<string | undefined>(initialGender);

  const [firstNameError, setFirstNameError] = React.useState<string>("");
  const [lastNameError, setLastNameError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");

  const [hasProfileDataChanged, setHasProfileDataChanged] =
    React.useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setInitialOriginalBannerPath(data.banner);
      setInitialSmallBannerPath(data.banner_small);
      setInitialOriginalAvatarPath(data.avatar);
      setInitialSmallAvatarPath(data.avatar_small);

      setInitialFirstName(data.first_name);
      setInitialLastName(data.last_name);
      setInitialDescription(data.description);
      setInitialEmail(data.email);
      setInitialGender(data.gender);

      setOriginalAvatarPath(data.avatar);
      setSmallAvatarPath(data.avatar_small);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setDescription(data.description);
      setEmail(data.email);
      setGender(data.gender);
    }
  }, [data]);

  const setToDefault = React.useCallback(() => {
    setCroppedAvatarFile(null);
    setCroppedAvatarUrl("");
    setOriginalAvatarFile(null);
    setOriginalAvatarUrl("");

    setOriginalAvatarPath(initialOriginalAvatarPath);
    setSmallAvatarPath(initialSmallAvatarPath);

    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setDescription(initialDescription);
    setEmail(initialEmail);
    setGender(initialGender);
  }, [
    initialOriginalAvatarPath,
    initialSmallAvatarPath,
    initialFirstName,
    initialLastName,
    initialDescription,
    initialEmail,
    initialGender,
    setFirstName,
    setLastName,
    setDescription,
    setEmail,
    setGender,
    setOriginalAvatarPath,
    setSmallAvatarPath,
  ]);

  const [imageErrorMessage, setImageErrorMessage] = React.useState("");

  const bannerState = React.useMemo(() => {
    const defaultImage = "/img/default/banner.jpg";
    if (
      !initialOriginalBannerPath &&
      !(croppedBannerUrl && initialOriginalBannerPath)
    ) {
      return defaultImage;
    }
    if (isBannerDeleted) {
      return defaultImage;
    } else {
      if (croppedBannerUrl && initialOriginalBannerPath) {
        return croppedBannerUrl;
      } else {
        return `${BASE_URL}${initialOriginalBannerPath}`;
      }
    }
  }, [
    isBannerDeleted,
    croppedBannerUrl,
    initialOriginalBannerPath,
    data,
    initialOriginalBannerPath,
  ]);

  const formValidator = React.useCallback(() => {
    const firstNameField = validateField(
      // @ts-ignore
      firstName,
      null,
      firstNameValidator,
      setFirstNameError,
    );
    const lastNameField = validateField(
      // @ts-ignore
      lastName,
      null,
      lastNameValidator,
      setLastNameError,
    );
    const emailField = validateField(
      // @ts-ignore
      email,
      null,
      emailValidator,
      setEmailError,
    );
    return firstNameField && lastNameField && emailField;
  }, [firstName, lastName, email]);

  React.useEffect(() => {
    formValidator();
  }, [firstName, lastName, email]);

  const newAvatarUploaded = React.useMemo(() => {
    return (
      originalAvatarFile &&
      croppedAvatarFile &&
      originalAvatarUrl &&
      croppedAvatarUrl
    );
  }, [
    originalAvatarFile,
    croppedAvatarFile,
    originalAvatarUrl,
    croppedAvatarUrl,
  ]);

  React.useEffect(() => {
    const currentBackendFileDeleted =
      originalAvatarPath !== initialOriginalAvatarPath &&
      smallAvatarPath !== initialSmallAvatarPath;
    const uploadedAvatarAndNewWasNotSetYet =
      !currentBackendFileDeleted && newAvatarUploaded;

    const isChanged =
      firstName === initialFirstName &&
      lastName === initialLastName &&
      description === initialDescription &&
      email === initialEmail &&
      gender === initialGender &&
      uploadedAvatarAndNewWasNotSetYet;
    setHasProfileDataChanged(!isChanged);
  }, [
    newAvatarUploaded,
    firstName,
    lastName,
    description,
    email,
    gender,
    initialFirstName,
    initialLastName,
    initialDescription,
    initialEmail,
    initialGender,
    originalAvatarPath,
    initialOriginalAvatarPath,
    smallAvatarPath,
    initialSmallAvatarPath,
  ]);

  React.useEffect(() => {
    const isValid = formValidator();
    const isFormChecked = hasProfileDataChanged && isValid;
    setIsReadyToSubmit(isFormChecked);
  }, [hasProfileDataChanged, formValidator]);

  // const bannerOriginal = React.useMemo(() => {
  //   if (originalBannerSource) {
  //     return originalBannerSource;
  //   } else if (bannerState === "/img/default/banner.jpg") {
  //     return "";
  //   }
  // }, [originalBannerSource, bannerState]);

  // const bannerSmall = React.useMemo(() => {
  //   if (croppedBanner) {
  //     return croppedBanner;
  //   } else if (bannerState === "/img/default/banner.jpg") {
  //     return "";
  //   }
  // }, [croppedBanner, bannerState]);

  const userGenderHandleChange = React.useCallback(
    (value: string) => {
      setGender(value);
    },
    [setGender],
  );

  const updateProfileData = async () => {
    const formData = new FormData();
    if (originalAvatarFile && croppedAvatarFile) {
      formData.append("avatar", originalAvatarFile);
      formData.append("avatar_small", croppedAvatarFile);
    }
    if (originalBannerFile && croppedBannerFile) {
      formData.append("banner", originalBannerFile);
      formData.append("banner_small", croppedBannerFile);
    }
    // @ts-ignore
    formData.append("first_name", firstName);
    // @ts-ignore
    formData.append("last_name", lastName);
    // @ts-ignore
    formData.append("description", description);
    // @ts-ignore
    formData.append("email", email);
    // @ts-ignore
    formData.append("gender", gender);
    const result = await changeUserProfile({ formData, username });
  };

  const avatarDeletedOrNotUploadedInitially = React.useMemo(() => {
    const uploadedAvatarAndNewWasNotSetYet =
      smallAvatarPath &&
      originalAvatarPath &&
      initialSmallAvatarPath &&
      initialOriginalAvatarPath &&
      !newAvatarUploaded;
    return uploadedAvatarAndNewWasNotSetYet || newAvatarUploaded;
  }, [
    newAvatarUploaded,
    smallAvatarPath,
    originalAvatarPath,
    initialSmallAvatarPath,
    initialOriginalAvatarPath,
  ]);

  const currentAvatarImage = React.useMemo(() => {
    const uploadedAvatarAndNewWasNotSetYet =
      smallAvatarPath &&
      originalAvatarPath &&
      initialSmallAvatarPath &&
      initialOriginalAvatarPath;

    if (uploadedAvatarAndNewWasNotSetYet && !newAvatarUploaded) {
      return `${BASE_URL}${initialSmallAvatarPath}`;
    } else if (newAvatarUploaded) {
      return croppedAvatarUrl;
    } else {
      return "/img/default/avatar_default.jpg";
    }
  }, [
    newAvatarUploaded,
    smallAvatarPath,
    originalAvatarPath,
    initialSmallAvatarPath,
    initialOriginalAvatarPath,
    croppedAvatarUrl,
  ]);

  return (
    <div>
      <div className={styles.tabTitle}>Настройки</div>
      <ProfileEditActionBar
        username={username}
        isReadyToSubmit={isReadyToSubmit}
        updateProfileData={updateProfileData}
        hasProfileDataChanged={hasProfileDataChanged}
        setToDefault={setToDefault}
      />
      <div className={styles.bannerAndAvatarContainer}>
        {/*<ProfileEditBanner*/}
        {/*  bannerState={bannerState}*/}
        {/*  isBannerDeleted={isBannerDeleted}*/}
        {/*  setIsBannerDeleted={setIsBannerDeleted}*/}
        {/*  setImageErrorMessage={setImageErrorMessage}*/}
        {/*  setChosenFile={setChosenFile}*/}
        {/*  setCroppedBannerUrl={setCroppedBannerUrl}*/}
        {/*  setCroppedBanner={setCroppedBanner}*/}
        {/*  originalBannerSource={originalBannerSource}*/}
        {/*  setOriginalBannerSource={setOriginalBannerSource}*/}
        {/*  originalBannerSourceUrl={originalBannerSourceUrl}*/}
        {/*  setOriginalBannerSourceUrl={setOriginalBannerSourceUrl}*/}
        {/*/>*/}
        <ProfileEditAvatar
          currentAvatarImage={currentAvatarImage}
          setOriginalAvatarPath={setOriginalAvatarPath}
          setSmallAvatarPath={setSmallAvatarPath}
          croppedAvatarUrl={croppedAvatarUrl}
          croppedAvatarFile={croppedAvatarFile}
          // @ts-ignore
          avatarDeletedOrNotUploadedInitially={
            avatarDeletedOrNotUploadedInitially
          }
          originalAvatarFile={originalAvatarFile}
          setOriginalAvatarFile={setOriginalAvatarFile}
          setCroppedAvatarFile={setCroppedAvatarFile}
          originalAvatarUrl={originalAvatarUrl}
          setCroppedAvatarUrl={setCroppedAvatarUrl}
          setOriginalAvatarUrl={setOriginalAvatarUrl}
          setChosenFile={setChosenFile}
          setImageErrorMessage={setImageErrorMessage}
        />
      </div>
      <ProfileUploadErrorModal
        imageErrorMessage={imageErrorMessage}
        chosenFile={chosenFile}
      />
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
          description={"Ваше имя пользователя. Менять имя пользователя нельзя."}
          disabled
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
        <Select
          data={genderList}
          defaultValue={initialGender}
          onChange={userGenderHandleChange}
          gender={gender}
          label={"Пол"}
        />
      </div>
    </div>
  );
}
