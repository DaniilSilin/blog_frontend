import React from 'react'
import { useAppSelector } from "../../../store"
import DjangoService from "@/app/store/services/DjangoService"
import { IoIosLogOut } from "react-icons/io";
import { IoIosCheckmark, IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5"
import { BsPaletteFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import Link from 'next/link'
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from 'next/router'

const BASE_URL = 'http://127.0.0.1:8000'

import styles from './header_profile.module.css'
import CookieHelper from "@/app/store/cookieHelper";

export default function HeaderProfile() {
  const router = useRouter()
  const userRef = React.useRef(null)
  const [ openUserMenu, setOpenUserMenu ] = React.useState<boolean>(false)
  const user = useAppSelector(state => state.django.profile)

  const logout = () => {
    CookieHelper.removeCookie('token')
    router.push('/')
  }

  React.useEffect(() => {
    // const handleMouseDown = (e: MouseEvent) => {
    //   if (openUserMenu) {
    //     if (!userRef.current.contains(e.target)) {
    //       setOpenUserMenu(false)
    //     }
    //   } else {
    //     if (userRef.current.contains(e.target)) {
    //       setOpenUserMenu(true)
    //     }
    //   }
    // }
    // document.addEventListener("mousedown", handleMouseDown)
    // return () => document.removeEventListener("mousedown", handleMouseDown)
  })

  if (CookieHelper.getCookie('token')) {
    return (
      <div ref={userRef} className={styles.root}>
          <div style={{display: 'flex', alignItems: 'center', height: 'inherit', padding: '5px', cursor: 'pointer'}}>
            <img src={`${BASE_URL}${user?.avatar_small}`} style={{borderRadius: '50%'}} width={52} height={52}
                 alt=''/>
            <IoIosArrowDown size={20}/>
          </div>
        <div>
            {openUserMenu && (
                <div className={styles.profileMenu}>
                    <div className={styles.profileMenuElement}>
                        <Link style={{ display: 'inline-block', height: '100%', width: '100%', padding: '10px 16px' }} href={{ pathname: `/profile/${user?.username}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <ImBooks style={{marginRight: '12px'}} size={24}/>
                              <div>Профиль</div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.profileMenuElement} style={{ padding: '10px 16px' }}>
                        <BsPaletteFill style={{ marginRight: '12px' }} size={24}/>
                        <div>Тема:</div>
                    </div>
                    <div className={styles.profileMenuElement}>
                        <Link href={{pathname: `/blogs/my`}} style={{ display: 'inline-block', height: '100%', width: '100%', padding: '10px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ImBooks style={{marginRight: '12px'}} size={24}/>
                                <div>Мои Блоги</div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.profileMenuElement}>
                        <Link href={{pathname: `/profile/${user?.username}/edit`}} style={{ display: 'inline-block', height: '100%', width: '100%', padding: '10px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IoSettingsOutline style={{marginRight: '12px'}} size={24}/>
                            <div>Настройки</div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.profileMenuElement} style={{ padding: '10px 16px' }}>
                        <IoIosLogOut style={{ marginRight: '12px' }} size={24}/>
                        <div onClick={logout}>Выйти</div>
                    </div>
                </div>
            )}
        </div>
      </div>
    )
  } else {
    return (
      <div ref={userRef} className={styles.root}>
        <div>Выйти</div>
      </div>
    )
  }
}