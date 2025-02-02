import React from 'react'
import DjangoService from '../../../store/services/DjangoService'

import { UserProfile } from '../../../types'
import ProfileHeader from './ProfileHeader'
import { useAppSelector } from "@/app/store"

import styles from './profile.module.css'

export default function Profile({ username }) {
  const { data: userData } = DjangoService.useUserProfileQuery({ username })

  return (
    <div className={styles.root}>
      {userData?.map((user: UserProfile) => (
        <>
          <ProfileHeader user={user} />
          <div></div>
        </>
      ))}
    </div>
  )
}