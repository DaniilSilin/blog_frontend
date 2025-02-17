import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"

import styles from './profile_edit.module.css'

const BASE_URL = 'http://127.0.0.1:8000'

export default function  ProfileEdit({ username }) {
  const { data: userData } = DjangoService.useUserProfileQuery({ username })

  return (
    <div>
      {userData?.map(user => (
        <div>
        </div>
      ))}
    </div>
  )
}