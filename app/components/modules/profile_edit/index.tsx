import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"
import ImageChange from "@/app/components/modules/profile_edit/ImageChange"

import styles from './profile_edit.module.css'
import _TextArea from "@/app/components/modules/form/Textarea";

const BASE_URL = 'http://localhost:8000'

export default function ProfileEdit({ username }) {
  const { data } = DjangoService.useUserProfileQuery({ username })
  const [ changeUser ] = DjangoService.useChangeUserProfileMutation()

  const [ age, setAge ] = React.useState<number>()
  const [ firstName, setFirstName ] = React.useState<string>('')
  const [ lastName, setLastName ] = React.useState<string>('')
  const [ email, setEmail ] = React.useState<string>('')
  const [ usernameState, setUsernameState ] = React.useState<string>(username)
  const [ displayModal, setDisplayModal ] = React.useState<boolean>(false)
  const [ image, setImage ] = React.useState<any>(null)
  const [ description, setDescription ] = React.useState<string>('')

  const [ show, setShow ] = React.useState<boolean>(false)
  const modalRef = React.useRef(null)

  const onMouseOverFunction = React.useCallback(() => {
    setShow(true)
  }, [ setShow ])

  const onMouseOutFunction = React.useCallback(() => {
    setShow(false)
  }, [ setShow ])

  const onSubmitData = () => {
    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('username', usernameState)
    formData.append('email', email)
    formData.append('avatar', image)
    changeUser({formData, usernameState})
  }

  const updateImageModalWindow = React.useCallback((e) => {
    const elem = e.target

    if (displayModal) {
      if (elem.parentNode.parentNode.className === 'close') {
        console.log(123)
      }
    } else {
      let modalNode = null
      if (elem.parentNode.parentNode.nextSibling.className === 'modal_2') {
        modalNode = elem.parentNode.parentNode.nextSibling
        modalNode.style.display = 'block'
        setDisplayModal(true)
      }
    }
  }, [ displayModal ])

  return (
    <div>
      {data?.map(user => (
        <>
        <div>
          <div ref={modalRef}>
            <div onMouseOver={onMouseOverFunction} onMouseOut={onMouseOutFunction} style={{ cursor: 'pointer' }}>
              <img src={`${BASE_URL}${user?.avatar_small}`} style={{ borderRadius: '50%' }} width={150} height={150} alt='' />
              {show && (
                <div className={styles.avatarDropdownActionMenu}>
                  <div>Открыть фотографию</div>
                  <div onClick={updateImageModalWindow}>Обновить фотографию</div>
                  <div>Удалить фотографию</div>
                </div>
              )}
            </div>
            <div className='modal_2'>
              <div className='modalContent_2'>
                <ImageChange username={user.username} />
              </div>
              <span className='close_2'>X</span>
            </div>
          </div>
          <__Input width={400} height={50} label={'Имя'} defaultValue={user?.first_name} onChange={setFirstName} placeholder={'Введите имя'} />
          <__Input width={400} height={50} label={'Фамилия'} defaultValue={user?.last_name} onChange={setLastName} placeholder={'Введите фамилию'} />
          <__Input width={400} height={50} label={'Электронная почта'} defaultValue={user?.email} onChange={setEmail} placeholder={'Введите название почты'}/>
          <__Input width={400} height={50} label={'Имя пользователя'} defaultValue={user?.username} onChange={setUsernameState} placeholder={'Введите имя пользователя'} />
          <_TextArea width={400} height={150} label={'Краткая информация'} onChange={setDescription} autoSize={false} maxLength={250} />
          <input type={'submit'} value={'Сохранить'} onClick={onSubmitData} />
        </div>
        </>
      ))}
    </div>
  )
}