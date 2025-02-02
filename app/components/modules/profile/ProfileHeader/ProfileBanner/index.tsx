import React from 'react'
import Image from 'next/image'

export interface Props {
  user: any
}

import styles from './ProfileBanner.module.css'

const BASE_URL = 'http://127.0.0.1:8000'

export default function ProfileBanner({ user }: Props) {
  const [ display, setDisplay ] = React.useState(false)
  const [ displayMenu, setDisplayMenu ] = React.useState(false)

  const onMouseLeaveHandle = () => {
    setDisplay(false)
  }

  const onMouseOverHandle = () => {
     setDisplay(true)
  }

  const onMouseLeaveHandle2 = () => {
    setDisplayMenu(false)
  }

  const onMouseOverHandle2 = () => {
     setDisplayMenu(true)
  }

  return (
    <div className={styles.root} onMouseLeave={onMouseLeaveHandle} onMouseOver={onMouseOverHandle}>
      <img src={`${BASE_URL}${user.banner_small}`} width={1000} height={175} className={styles.banner} alt='' />
      <>
        {display && (
          <div style={{ position: 'absolute', zIndex: '10', backgroundColor: 'red' }} onMouseOver={onMouseOverHandle2} onMouseLeave={onMouseLeaveHandle2}>
            Изменить обложку
            {displayMenu && (
              <div>
                <div>Загрузить изображение</div>
                <div>Область отображения</div>
                <div>Удалить</div>
              </div>
            )}
          </div>
        )}
      </>

    </div>
  )
}
