import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import classNames from "classnames";
import { useRouter } from "next/router";
import { logout as reduxLogout } from "@/app/store/reducers/slices/djangoSlice";
import { useDispatch } from "react-redux";

import ProfileDeleteMessageModal from "./ProfileDeleteMessageModal";

import styles from "./profile_edit_action_bar.module.css";
import CookieHelper from "@/app/store/cookieHelper";

export interface Props {
  username: string;
  hasProfileDataChanged: boolean;
  isReadyToSubmit: boolean;
  updateProfileData: () => void;
  setToDefault: () => void;
}

export default function ProfileEditActionBar({
  username,
  hasProfileDataChanged,
  isReadyToSubmit,
  updateProfileData,
  setToDefault,
}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [displaySubmitDeleteBlogModal, setDisplaySubmitDeleteBlogModal] =
    React.useState(false);
  const [deleteProfile] = DjangoService.useDeleteProfileMutation();

  const freezeBody = React.useCallback(
    () => document.querySelector(".modal")?.classList.add("freeze"),
    [],
  );
  const unfreezeBody = React.useCallback(
    () => document.querySelector(".modal")?.classList.remove("freeze"),
    [],
  );

  //
  const handleDisplayModal = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (displaySubmitDeleteBlogModal) {
        if (
          elem.className.startsWith("modal") ||
          elem.className.endsWith("close_5")
        ) {
          if (elem.className.endsWith("close_5")) {
            elem = elem.parentNode.parentNode.parentNode;
          }
          elem.style.display = "none";
          unfreezeBody();
          setDisplaySubmitDeleteBlogModal(false);
        }
      } else {
        let modalNode = null;
        if (elem.firstElementChild.className.startsWith("modal")) {
          modalNode = elem.firstElementChild;
          modalNode.style.display = "block";
          freezeBody();
          setDisplaySubmitDeleteBlogModal(true);
        }
      }
    },
    [displaySubmitDeleteBlogModal, freezeBody, unfreezeBody],
  );
  //

  const handleDeleteAccountButtonClick = async () => {
    const result = await deleteProfile({ username });
    // @ts-ignore
    if (!result.error) {
      setDisplaySubmitDeleteBlogModal(false);
      CookieHelper.removeCookie("token");
      dispatch(reduxLogout());
      router.push("/");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.selectionTypeContainer}>
        <div>Основные</div>
      </div>
      <div className={styles.actionButtonsContainer}>
        <button className={styles.deleteButton} onClick={handleDisplayModal}>
          Удалить аккаунт
          <ProfileDeleteMessageModal
            setDisplaySubmitDeleteBlogModal={setDisplaySubmitDeleteBlogModal}
            handleDeleteAccountButtonClick={handleDeleteAccountButtonClick}
          />
        </button>
        <button
          className={classNames(styles.cancelButton, {
            [styles.active]: hasProfileDataChanged,
          })}
          disabled={!hasProfileDataChanged}
          onClick={setToDefault}
        >
          Отмена
        </button>
        <button
          className={classNames(styles.submitButton, {
            [styles.active]: isReadyToSubmit,
          })}
          disabled={!isReadyToSubmit}
          onClick={updateProfileData}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
