import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"
import _TextArea from "@/app/components/modules/form/Textarea"

import styles from './blog_edit.module.css'
import ImageUpload from './ImageUpload'

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

  const handleModalFunction = React.useCallback((e) => {
    let elem = e.target
    if (isModalOpen) {
      console.log(elem)
    } else {
      let modalNode = null
      if (elem.nextSibling.className === 'blog_edit_modal__aA8Pb') {
        modalNode = elem.nextSibling
      }
      if (modalNode) {
        (modalNode as HTMLDivElement).style.display = 'block'
        freezeBody()
        setIsModalOpen(true)
        console.log(elem)
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
    return null
  }

  return (
    <div>
          <img onClick={handleModalFunction} src={`${BASE_URL}${data?.avatar}`} alt='' width={200} height={200} />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <ImageUpload avatar={avatar} setAvatar={setAvatar} avatarSmall={avatarSmall} setAvatarSmall={setAvatarSmall} />
            </div>
          </div>
          <__Input width={500} height={50} onChange={setTitle} label={'Название блога'} defaultValue={data?.title} />
          <_TextArea width={500} height={100} label={'Описание блога'} onChange={setDescription} defaultValue={data?.description} />
          <__Input width={500} height={50} onChange={setEmail} label={'Почта'} defaultValue={data?.email} />
          <__Input width={500} height={50} onChange={setPhoneNumber} label={'Номер телефона'} defaultValue={data?.phone_number} />
          <input type={'submit'} onClick={sendData} value={'Сохранить'}/>
          <input type={'submit'} onClick={deleteItem} value={'Удалить Блог'}/>

    </div>
  )
}