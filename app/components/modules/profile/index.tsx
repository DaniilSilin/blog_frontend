import React from 'react'
import DjangoService from '../../../store/services/DjangoService'

import { UserProfile } from '../../../types'
import ProfileHeader from './ProfileHeader'
import { useAppSelector } from "@/app/store"

import styles from './profile.module.css'

export default function Profile({ username }) {
  const { data: userData } = DjangoService.useUserProfileQuery({ username })
  const _user = useAppSelector(state => state.django.profile)

  const [ hasAccess, setHasAccess ] = React.useState(false)

  React.useEffect(() => {
    if (Object.keys(_user).length === 0) {
      setHasAccess(false)
    } else {
      const access = _user.username === userData.username || _user.is_admin.toString() === 'true'
      setHasAccess(access)
    }
  }, [ userData, _user, setHasAccess ])

  return (
    <div className={styles.root}>
      {userData?.map((user: UserProfile) => (
        <>
          <ProfileHeader user={user} hasAccess={hasAccess} />
          <div></div>
        </>
      ))}
    </div>
  )
}