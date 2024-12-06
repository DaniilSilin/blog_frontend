import React from 'react'
import __Input from "@/app/components/modules/form/Input"
import DjangoService from "@/app/store/services/DjangoService"
import { Button, Divider, Input, Select, Space } from 'antd/lib'
import Image from 'next/image'
// import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd/lib';
import {SelectProps} from "antd/lib";

const BASE_URL = 'http://localhost:8000'

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

  const [ username, setUsername ] = React.useState<string>('')
  const { data: user_list } = DjangoService.useGetUsersQuery({ username })
    console.log(user_list)

  type LabelRender = SelectProps['labelRender'];

  const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>No option match</span>;
  };

  return (
      <div>
        <div>Создать приглашение в Блог</div>
        {/*<__Input width={300} height={50} onChange={setUsername} label={'Имя пользователя'} />*/}
        <Select
            mode="multiple"
            showSearch
            options={user_list}
            labelRender={labelRender}
            onChange={setUsername}
            style={{ width: '300px' }}
            placeholder="Имя пользователя"
            filterOption={(input, option) =>
              (option?.username ?? '').toLowerCase().includes(input.toLowerCase())
            }
            optionRender={(option) => (
                <Space>
                    <div style={{color: 'gray', borderRadius: '50%', height: '20px'}}></div>
                    <div style={{ display: 'flex' }}>
                        <img src={`${BASE_URL}${option.data.avatar}`} alt="" width='40' height='40'/>
                        <div style={{ marginLeft: '10px' }}>
                            <div>{option.data.username}</div>
                            <div>{option.data.email}</div>
                        </div>
                    </div>
                </Space>
            )}
        />
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