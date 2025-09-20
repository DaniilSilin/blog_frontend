import React from "react";
import { useAppSelector } from "@/app/store";
import moment from "moment";
import "moment/locale/ru";

import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdAlternateEmail, MdOutlineArticle } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";

import styles from "./profileDetails.module.css";

export default function ProfileDetails() {
  const user = useAppSelector((state) => state.django.profile);

  return (
    <div>
      <div>
        <div className={styles.modalHeader}>Подробная информация</div>
        <div className={styles.divider}></div>
        <div className={styles.modalContent}>
          {user.description && (
            <div>
              <MdOutlineArticle size={20} className={styles.modalContentIcon} />
              <div>{user.description}</div>
            </div>
          )}
          {!(user.gender === null) && (
            <div>
              <BiMaleFemale size={20} className={styles.modalContentIcon} />
              <div>
                Пол: {user.gender.toString() === "true" ? "Мужской" : "Женский"}
              </div>
            </div>
          )}
          {user.date_of_birth && (
            <div>
              <FaBirthdayCake size={20} className={styles.modalContentIcon} />
              <div>
                День рождения:{" "}
                {moment(user.date_of_birth).format("D MMMM YYYY")}
              </div>
            </div>
          )}
          {user.first_name && user.last_name && (
            <div>
              <FaUser size={20} className={styles.modalContentIcon} />
              <div>
                Полное имя: {user.first_name} {user.last_name}
              </div>
            </div>
          )}
          <div>
            <IoPersonAddOutline size={20} className={styles.modalContentIcon} />
            <div>
              Присоединился: {moment(user.date_joined).format("D MMMM YYYY")}
            </div>
          </div>
          {user.email && (
            <div>
              <MdAlternateEmail size={20} className={styles.modalContentIcon} />
              <div>
                E-mail: <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
