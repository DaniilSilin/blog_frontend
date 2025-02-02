import React from 'react'
import Image from 'next/image'
import { UserProfile } from "@/app/types"

export interface Props {
  user: UserProfile
}

import styles from './ProfileAvatar.module.css'
import ImageChange from "@/app/components/modules/profile_edit/ImageChange";

const BASE_URL = 'http://localhost:8000'

export default function ProfileAvatar({ user }: Props) {
  const [ displayMenu, setDisplayMenu ] = React.useState(false)
  const [ displayModal, setDisplayModal ] = React.useState(false)

  const onMouseOverHandleFunction = () => {
    setDisplayMenu(true)
  }

  const onMouseLeaveHandleFunction = () => {
    setDisplayMenu(false)
  }

  const handleDynamicContentClick = React.useCallback((e: any) => {
    const elem = e.target
    if (displayModal) {
      if (elem.className === "modal_3") {
        elem.style.display = "none"
        setDisplayModal(false)
      }
    } else {
      let modalNode = null
      console.log(elem)
      if (elem.className === 'open_original_image' || elem.className === 'update_image' || elem.className === 'change_small_image' || elem.className === 'delete_image' ) {
        modalNode = elem.parentNode.parentNode.firstChild
        modalNode.childNodes.forEach((child: HTMLDivElement) => {
          console.log(child)
          if (child.className === 'modal_3' && child.id === '1') {
            modalNode = child
          }
          if (child.className === 'modal_3' && child.id === '2') {
            modalNode = child
          }
          if (child.className === 'modal_3' && child.id === '3') {
            modalNode = child
          }
        })
        console.log(modalNode)
        modalNode.style.display = 'block'
        setDisplayModal(true)
      }
    }
  }, [ displayModal ])

  return (
      <div className={styles.root} onMouseOver={onMouseOverHandleFunction} onMouseLeave={onMouseLeaveHandleFunction}>
        <div className='modal_elements'>
          <div className='modal_3' id={'1'}>
            <div className='modalContent_3'>
              <ImageChange username={user.username}/>
            </div>
          </div>
          <div className='modal_3' id={'2'}>
            <img src={`${BASE_URL}${user.avatar}`} alt=''/>
          </div>
          <div className='modal_3' id={'3'}>
            <div className='modalContent_3'>
              <div>wdawdawdawdawd</div>
            </div>
          </div>
          <div className='modal_3' id={'4'}>
            <div className='modalContent_3'>
              <div>123123123</div>
            </div>
          </div>
        </div>
        <Image className={styles.avatar} src={`${BASE_URL}${user.avatar_small}`} width={150} height={150} alt=''/>
        {displayMenu && (
            <>
              <div className={styles.avatarDropdown}>
                <div onClick={handleDynamicContentClick} className='open_original_image'>Открыть фотографию</div>
                <div onClick={handleDynamicContentClick} className='update_image'>Обновить фотографию</div>
                <div onClick={handleDynamicContentClick} className='change_small_image'>Изменить миниатюру</div>
                <div onClick={handleDynamicContentClick} className='delete_image'>Удалить фотографию</div>
              </div>
            </>
        )}
      </div>
  )
}

