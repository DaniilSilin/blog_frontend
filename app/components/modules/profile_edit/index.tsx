import React, { ChangeEvent } from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import __Input from "@/app/components/modules/form/Input";
import Image from 'next/image'

const BASE_URL = 'http://localhost:8000'

export default function ProfileEdit({ username }) {
  const { data } = DjangoService.useUserProfileQuery({ username })
  const [ changeUser ] = DjangoService.useChangeUserProfileMutation()

  const [ firstName, setFirstName ] = React.useState<string>('')
  const [ lastName, setLastName ] = React.useState<string>('')
  const [ email, setEmail ] = React.useState<string>('')
  const [ usernameState, setUsernameState ] = React.useState<string>(username)
  const [ image, setImage ] = React.useState<any>(null)

  const [ firstNameError, setFirstNameError ] = React.useState<string | null>(null)
  const [ lastNameError, setLastNameError ] = React.useState<string>('')
  const [ emailError, setEmailError ] = React.useState<string>('')
  const [ usernameError, setUsernameError ] = React.useState<string>('')

  const [ show, setShow ] = React.useState<boolean>(false)
  const [ visible, setIsVisible ] = React.useState(false)
  const dropdownRef = React.useRef(null)

  const checkValidation = React.useCallback(() => {
    let isValid = true

    if (!firstName) {
      setFirstNameError('Поле пустое')
      isValid = false
    } else if (lastName.match(/[\d=+()\]\[]+/g)) {
      setFirstNameError('Поле содержит недопустимые символы')
      isValid = false
    } else {
      setFirstNameError(null)
    }
    return isValid
  }, [ firstName, setFirstName ])

  // const handleBlurFirstName = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   const
  // }, [])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (dropdownRef.current.contains(e.target)) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler);
  })

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
    setIsVisible(false)
  }

  const onMouseOverFunction = React.useCallback(() => {
    setShow(true)
  }, [ show ])

  const onMouseOutFunction = React.useCallback(() => {
    setShow(false)
  }, [ show ])

  const imageDelete = () => {
    setImage(null)
  }

  const onSubmitData = () => {
    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('username', usernameState)
    formData.append('email', email)
    formData.append('avatar', image)
    changeUser({formData, usernameState})
  }

  return (
    <div>
      {data?.map(user => (
          <div>
            <div ref={dropdownRef}>
              <div onMouseOver={onMouseOverFunction} onMouseOut={onMouseOutFunction} style={{cursor: 'pointer'}} >
                <img
                    src={image ? URL.createObjectURL(image) : (!(user?.avatar.endsWith('/icy.jpg')) ? `${BASE_URL}${user.avatar}` : '/icy.jpg')}
                    alt='' width={200} height={200} />
                {show && (
                    <Image style={{position: 'absolute', zIndex: '1', left: '130px', top: '160px'}} src={'/camera.png'}
                         alt='' width={100} height={100}/>
                )}
              </div>
              {visible && (
                  <div style={{ border: '1px solid black', display: 'block', width: '150px' }}>
                    <label style={{ display: 'block'}} htmlFor='real-input'>Загрузить фото
                      <input type='file' id='real-input' accept='image/*' style={{ opacity: '0' }} onChange={imageChange}/>
                    </label>
                    <label style={{ display: 'block'}} onClick={imageDelete}>Удалить фото</label>
                  </div>
              )}
            </div>
            <__Input width={400} height={50} label={'Имя'} error={firstNameError} defaultValue={user?.first_name} onChange={setFirstName} placeholder={'Введите имя'} />
            <__Input width={400} height={50} label={'Фамилия'} error={lastNameError} defaultValue={user?.last_name} onChange={setLastName} placeholder={'Введите фамилию'} />
            <__Input width={400} height={50} label={'Электронная почта'} error={emailError} defaultValue={user?.email} onChange={setEmail} placeholder={'Введите название почты'}/>
            <__Input width={400} height={50} label={'Имя пользователя'} error={usernameError} defaultValue={user?.username} onChange={setUsernameState} placeholder={'Введите имя пользователя'} />
            <input type={'submit'} value={'Сохранить'} onClick={onSubmitData} />
            {/*<div>{user.subscriptions.map(subscription => (*/}
            {/*    <div>{subscription}</div>*/}
            {/*))}</div>*/}
          </div>
      ))}
    </div>
  )
}