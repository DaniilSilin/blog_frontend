import React from 'react'
import __Input from "@/app/components/modules/form/Input"
import DjangoService from "@/app/store/services/DjangoService"
import { Select } from 'antd/lib'

export default function Invite() {
  const [ addressee, setAddressee ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ blog, setBlog ] = React.useState<string>('')

  const [ inviteToBlog ] = DjangoService.useInviteUserToBlogMutation()
  const { data } = DjangoService.useGetUserDataQuery()
  const { data: blog_owner_list } = DjangoService.useGetBlogOwnerListQuery()

  const inviteToBlogOnClick = () => {
      inviteToBlog({ addressee, description, blog: blog, admin: data.id })
  }

  return (
      <div>
        <div>Создать приглашение в Блог</div>
        <__Input width={300} height={50} onChange={setAddressee} label={'Имя пользователя'} />
        <__Input width={300} height={50} onChange={setDescription} label={'Текст приглашения'} />
        <div>Выбрать блог</div>
        <Select
            showSearch
            placeholder="Выбрать блог"
            options={blog_owner_list}
            style={{ width: '300px' }}
            onChange={setBlog}
        />
        <input style={{ display: 'block'}} type={'submit'} value={'Отправить приглашение'} onClick={inviteToBlogOnClick} />
      </div>
  )
}