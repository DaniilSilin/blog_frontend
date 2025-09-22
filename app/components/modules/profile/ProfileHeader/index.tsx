import React from "react";

import ProfileDetails from "./ProfileDetails";
// import ProfileBanner from "./ProfileBanner";
// import ProfileAvatar from "./ProfileAvatar";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { UserProfile } from "@/app/types";

export interface Props {
  user: UserProfile;
}

import styles from "./ProfileHeader.module.css";
import { useAppSelector } from "@/app/store";

export default function ProfileHeader({ user }: Props) {
  const [displayModal, setDisplayModal] = React.useState(false);

  const details = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (displayModal) {
        if (elem.className === "modal_3") {
          elem.style.display = "none";
          setDisplayModal(false);
        }
      } else {
        let modalNode = null;
        if (elem.className.startsWith("ProfileHeader_details")) {
          modalNode = elem.parentNode.nextSibling;
          modalNode.style.display = "block";
          setDisplayModal(true);
        }
      }
    },
    [displayModal],
  );

  return (
    <div className={styles.profileHeader}>
      {/*<ProfileBanner user={user} />*/}
      {/*<div className={styles.profileInformationContainer}>*/}
      {/*  <ProfileAvatar user={user} />*/}
      {/*  <div className={styles.profileInformationMain}>*/}
      {/*    <div className={styles.username}>{user.username}</div>*/}
      {/*    <div style={{ display: "flex" }} onClick={details}>*/}
      {/*      <IoIosInformationCircleOutline size={20} />*/}
      {/*      <div className={styles.details}>Подробнее</div>*/}
      {/*    </div>*/}
      {/*    <ProfileDetails user={user} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
