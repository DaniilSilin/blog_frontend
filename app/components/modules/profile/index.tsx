import React from "react";
import DjangoService from "../../../store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { UserProfile } from "@/app/types";
import ProfileHeader from "./ProfileHeader";

import { IoIosInformationCircleOutline } from "react-icons/io";
import ProfileDetails from "@/app/components/modules/profile/ProfileHeader/ProfileDetails";
import Image from "next/image";

import styles from "./profile.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export default function Profile({ username }) {
  const { data: user } = DjangoService.useUserProfileQuery({ username });
  const _user = useAppSelector((state) => state.django.profile);

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
      <div>
        <Image
          src={
            user.banner_small
              ? `${BASE_URL}${user.banner_small}`
              : "/img/default/banner.jpg"
          }
          width={1000}
          height={175}
          className={styles.banner}
          alt=""
        />
      </div>
      <div
        className={styles.profileInformationContainer}
        style={{ display: "flex" }}
      >
        <div>
          <Image
            className={styles.avatar}
            src={
              user.avatar_small
                ? `${BASE_URL}${user.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            width={150}
            height={150}
            alt={""}
          />
        </div>
        <div>
          <div className={styles.username}>{user.username}</div>
        </div>
        {/*<div className={styles.profileInformationMain}>*/}
        {/*  <div className={styles.username}>{user.username}</div>*/}
        {/*  <div style={{ display: 'flex' }} onClick={details}>*/}
        {/*  <IoIosInformationCircleOutline size={20}/>*/}
        {/*    <div className={styles.details}>Подробнее</div>*/}
        {/*  </div>*/}
        {/*  <ProfileDetails />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
