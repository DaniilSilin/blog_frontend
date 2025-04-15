import React from "react";
import DjangoService from "../../../store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { UserProfile } from "@/app/types";

import { IoIosInformationCircleOutline } from "react-icons/io";
import ProfileDetails from "@/app/components/modules/profile/ProfileHeader/ProfileDetails";
import ProfileSider from "@/app/components/modules/profile/ProfileSider";

import styles from "./profile.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export default function Profile({ username }) {
  const { data: user } = DjangoService.useUserProfileQuery({ username });
  const _user = useAppSelector((state) => state.django.profile);

  const [displayModal, setDisplayModal] = React.useState(false);

  const details = React.useCallback(
    (e: any) => {
      let elem = e.target;
      console.log(elem);
      if (displayModal) {
        if (elem.className === "modal_3") {
          elem.style.display = "none";
          setDisplayModal(false);
        }
      } else {
        let modalNode = null;
        if (elem.className.startsWith("profile_detailsB")) {
          modalNode = elem.nextSibling;
          console.log(modalNode);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className={styles.profileInformationMain}>
            <div className={styles.username}>{user.username}</div>
            <button className={styles.detailsButton} onClick={details}>
              <IoIosInformationCircleOutline size={20} />
              Подробнее
            </button>
            <div className={"modal_3"}>
              <div className={"modalContent_3"}>
                <ProfileDetails />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px", marginRight: "150px" }}>
            {(user.username === _user.username || user.is_admin) && (
              <Link href={`/profile/${user.username}/edit/`}>
                <button className={styles.editProfileButton}>
                  Редактировать профиль
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/*<div style={{ display: "flex" }}>*/}
      {/*  <div style={{ width: "70%" }}>123123</div>*/}
      {/*  <ProfileSider user={user} />*/}
      {/*</div>*/}
    </div>
  );
}
