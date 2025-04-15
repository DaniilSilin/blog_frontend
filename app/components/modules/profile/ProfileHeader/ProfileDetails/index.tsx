import React from "react";
import { useAppSelector } from "@/app/store";
import moment from "moment";
import "moment/locale/ru";

import { UserProfile } from "../../../../types";

import styles from "./profileDetails.module.css";

import { FaBirthdayCake } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";

export default function ProfileDetails() {
  const user = useAppSelector((state) => state.django.profile);

  return (
    <div>
      <div>
        <div className={styles.modalHeader}>Подробная информация</div>
        <div className={styles.divider}></div>
        <div className={styles.modalContent}>
          <div>
            <FaBirthdayCake size={16} className={styles.modalContentIcon} />
            <div>
              День рождения: {moment(user.date_of_birth).format("D MMMM YYYY")}
            </div>
          </div>
          <div>
            <IoPersonAddOutline size={16} className={styles.modalContentIcon} />
            <div>
              Присоединился: {moment(user.date_joined).format("D MMMM YYYY")}
            </div>
          </div>
          <div>
            <IoPersonAddOutline size={16} className={styles.modalContentIcon} />
            <div>
              E-mail: <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
