import React from 'react'
import { useAppSelector } from "../../../store"
import DjangoService from "@/app/store/services/DjangoService"

import styles from './header_profile.module.css'

const BASE_URL = 'http://localhost:8000'

export default function HeaderProfile() {
  const userRef = React.useRef(null)
  const [ openUserMenu, setOpenUserMenu ] = React.useState<boolean>(false)
  const user = useAppSelector(state => state.django.profile)

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (openUserMenu) {
        if (userRef.current.compareDocumentPosition(e.target) === 0 || userRef.current.compareDocumentPosition(e.target) === 20 || !userRef.current.contains(e.target)) {
          setOpenUserMenu(false)
        }
      } else {
        if (userRef.current.contains(e.target)) {
          setOpenUserMenu(true)
        }
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  })

  const logoutUser1 = () => {
    localStorage.removeItem("authToken")
  }
  if (!user) {
    return (
      <div>
        Войти
      </div>
    )
  } else {
    return (
      <div ref={userRef} className={styles.root}>
        <div>
          <img src={`${BASE_URL}/media/icy.jpg`} width={32} height={32} alt='' />
        </div>
        <div>
        {openUserMenu && (
          <div className={styles.profileMenu}>
            <div>Изменить профиль</div>
            <div>Перейти в профиль</div>
            <div onClick={logoutUser1}>Выйти</div>
          </div>
        )}
        </div>
      </div>
    )}
}