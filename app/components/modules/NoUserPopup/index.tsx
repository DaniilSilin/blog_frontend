import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './no_user_popup.module.css'

export interface Props {
  title: string
  description: string
}

export default function NoUserPopup({ title, description }: Props) {
  const router = useRouter()

  const signIn = () => {
    router.push('/login')
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <Link className={styles.loginButton} href={`/login`}>
        <div onClick={signIn}>Войти</div>
      </Link>
    </div>
  )
}