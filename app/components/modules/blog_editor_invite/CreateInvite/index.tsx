import React from 'react'
import __Input from "@/app/components/modules/form/Input";
import {Select, Space} from "antd/lib";
import SelectField from "@/app/components/modules/form/SelectField";
import DjangoService from "@/app/store/services/DjangoService";
import TextArea from "@/app/components/modules/form/Textarea";
import {useAppSelector} from "@/app/store";

export interface Props {
  slug: string
}

const BASE_URL = 'http://localhost:8000'

export default function CreateInvite({ slug }: Props) {
  const user = useAppSelector(state => state.django.profile)
  const [ addressee, setAddressee ] = React.useState('')
  const [ description, setDescription ] = React.useState<string>('')

  const [ inviteToBlog ] = DjangoService.useInviteUserToBlogMutation()

  const inviteToBlogOnClick = () => {
    inviteToBlog({ addressee, description, blog: slug, admin: user?.id })
  }

  const [ username, setUsername ] = React.useState<string>('')
  const { data: userList } = DjangoService.useGetUsersQuery({ username: username, slug: slug })

  const searchUserByUsername = React.useCallback((value: string) => {
    setUsername(value)
  }, [ setUsername ])

  const selectUser = React.useCallback((value: any) => {
    setAddressee(value.value)
  }, [ setAddressee ])

  return (
      <div style={{marginRight: '40px'}}>
          <div style={{fontSize: '22px', fontWeight: '600', marginBottom: '15px'}}>Создать приглашения</div>
          <div style={{marginBottom: '20px'}}>
          <div style={{fontSize: '16px', marginBottom: '5px'}}>Пригласить пользователя</div>
          <Select
            labelInValue
            showSearch
            onSearch={searchUserByUsername}
            style={{width: '400px'}}
            placeholder="Выберите пользователя"
            value={addressee}
            onSelect={selectUser}
            options={userList}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.username}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={`${BASE_URL}${option.data.avatar_small}`} style={{borderRadius: '50%', marginRight: '10px'}}
                         width={40} height={40} alt=''/>
                      <div>
                        <div style={{fontSize: '16px'}}>{option.data.value}</div>
                        <div style={{fontSize: '14px'}}>{option.data.email}</div>
                      </div>
                  </div>
                </span>
              </Space>
            )}
          />
          </div>
          {/*<SelectField options={blog_owner_list} label={'Выбор пользователя'}/>*/}
          <TextArea width={400} height={100} onChange={setDescription} autoSize={false} showCount={true} maxLength={300} label={'Текст приглашения'}/>
          <input style={{display: 'block'}} type={'submit'} value={'Отправить приглашение'}
                 onClick={inviteToBlogOnClick}/>
      </div>
  )
}