import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"
import _TextArea from "@/app/components/modules/form/Textarea"

import styles from './blog_edit.module.css'
import ImageUpload from './ImageUpload'
import SelectField from "@/app/components/modules/form/SelectField";

const BASE_URL = 'http://localhost:8000'

export default function BlogEdit({ slug }) {
  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()
  const [ kickUser ] = DjangoService.useKickUserMutation()

  const { data } = DjangoService.useGetBlogQuery({ slug })

  const [ title, setTitle ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ phoneNumber, setPhoneNumber ] = React.useState<string>('')
  const [ email, setEmail ] = React.useState<string>('')
  const [ avatar, setAvatar ] = React.useState<any>(null)
  const [ avatarSmall, setAvatarSmall ] = React.useState<any>(null)

  const [ isModalOpen, setIsModalOpen ] = React.useState<boolean>(false)
  const freezeBody = React.useCallback(() => document.querySelector("body")?.classList.add("freeze"), [])
  const unfreezeBody = React.useCallback(() => document.querySelector("body")?.classList.remove("freeze"), [])

  const [ sourceImage, setSourceImage ] = React.useState('')

  const handleModalFunction = React.useCallback((e) => {
    let elem = e.target
    if (isModalOpen) {
    } else {
      let modalNode = null
      if (elem.nextSibling.className === 'blog_edit_modal__aA8Pb') {
        modalNode = elem.nextSibling
      }
      if (modalNode) {
        (modalNode as HTMLDivElement).style.display = 'block'
        freezeBody()
        setIsModalOpen(true)
      }
    }
  }, [ isModalOpen, freezeBody, unfreezeBody ])

  const handleShowModal = React.useCallback((e) => {
    let elem = e.target
    if (isModalOpen) {
    } else {
      let modalNode = null
      if (elem.nextSibling.className === 'blog_edit_modal__aA8Pb') {
        modalNode = elem.nextSibling
      }
      if (modalNode) {
        (modalNode as HTMLDivElement).style.display = 'block'
        freezeBody()
        setIsModalOpen(true)
      }
    }
  }, [ isModalOpen, freezeBody, unfreezeBody ])

  const deleteItem = () => {
    deleteBlog({ slug })
  }

  // const updateItem = () => {
  //   updateBlog({ formData, slug })
  // }

  const sendData = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('phoneNumber', phoneNumber)
    formData.append('blog', slug)
    formData.append('avatar', avatar)
    formData.append('avatar_small', avatarSmall)
    updateBlog({ formData, slug })
  }

  if (!data) {
    return <div>Загрузка</div>
  }


  const onSelectFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    console.log(reader)
    reader.addEventListener("load", () => {
      const imageElement = new Image()
      const imageUrl = reader.result.toString() || ''
      console.log(imageUrl)
      setSourceImage(imageUrl)
      const elem = e.target
      console.log(elem)
    })
    reader.readAsDataURL(file)
  }


  return (
    <div>
      <div>
        <div>Баннер</div>
        <div>Это изображение показывается в верхней части страницы канала.</div>
        <img src={`${BASE_URL}${data?.banner}`} width={100} height={50} alt={''}  />
        <div>
          <div>
            <div>Изменить</div>
            <input type={'file'} onChange={onSelectFile} accept='image/*' />
          </div>
          <div>Удалить</div>
        </div>
      </div>
      <div className={'modal'}>
        <div className={'modalContent'}>

        </div>
      </div>
      <div>
        <div>Фото профиля</div>
        <div>Фото профиля показывается, например, рядом с вашими видео или комментариями на сайте.</div>
        <img src={`${BASE_URL}${data?.avatar}`} width={100} height={50} alt={''}  />
        <div>
          <div>
            <div>Изменить</div>
            <input type={'file'} accept='image/*' />
          </div>
          <div>Удалить</div>
        </div>
      </div>
      {/*<img onClick={handleModalFunction} src={`${BASE_URL}${data?.avatar}`} alt='' width={200} height={200} />*/}
      {/*<div className={styles.modal}>*/}
      {/*  <div className={styles.modalContent}>*/}
      {/*    <ImageUpload avatar={avatar} setAvatar={setAvatar} avatarSmall={avatarSmall} setAvatarSmall={setAvatarSmall} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <__Input width={500} height={50} onChange={setTitle} label={'Название блога'} defaultValue={data?.title} />
      <_TextArea width={500} height={100} label={'Описание блога'} onChange={setDescription} defaultValue={data?.description} />
      <__Input width={500} height={50} onChange={setEmail} label={'Почта'} defaultValue={data?.email} />
      <__Input width={500} height={50} onChange={setPhoneNumber} label={'Номер телефона'} defaultValue={data?.phone_number} />
      <input type={'submit'} onClick={sendData} value={'Сохранить'}/>
      <input type={'submit'} onClick={deleteItem} value={'Удалить Блог'}/>
    </div>
  )
}