import React from 'react'
import { UserProfile } from '../../../../types'

import styles from './profileDetails.module.css'

import { FaBirthdayCake } from 'react-icons/fa'
import { IoPersonAddOutline } from "react-icons/io5"
export interface Props {
  user: UserProfile
}

export default function ProfileDetails({ user }: Props) {
  return (
      <div className="modal_3">
        <div className="modalContent_3">
          <div className={styles.modalHeader}>Подробная информация</div>
          <div className={styles.divider}></div>
          <div className={styles.modalContent}>
            <div>
              <FaBirthdayCake size={16} className={styles.modalContentIcon}/>
              <div>День рождения: {user.date_of_birth}</div>
            </div>
            <div>
              <IoPersonAddOutline size={16} className={styles.modalContentIcon}/>
              <div>Присоединился: {user.date_joined}</div>
            </div>
            <div>
              <IoPersonAddOutline size={16} className={styles.modalContentIcon}/>
              <div>E-mail: <a href={`mailto:${user.email}`}>{user.email}</a></div>
            </div>
          </div>
        </div>
      </div>
  )
}