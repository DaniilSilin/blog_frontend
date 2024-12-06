import React, { ChangeEvent } from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ru'

const BASE_URL = 'http://localhost:8000'

export default function Profile({ username}) {
  const { data } = DjangoService.useUserProfileQuery({ username })
  const router = useRouter()
  console.log(data)

  // if (data == undefined) {
  //   return (
  //       <div>404 user doesnt exist</div>
  //   )
  // }

  const routerPush = React.useCallback(() => {
     router.push({
      pathname: `/profile/${username}/edit/`,
    }, undefined, { shallow: false })
  }, [ router ])

  return (
    <div>
      {data?.map(user => (
        <div>
          <img src={`${BASE_URL}${user.avatar}`} alt='' width={200} height={200} />
          {user?.is_request_user.toString() === 'true' ? (
              <div style={{ fontSize: '16px' }} onClick={routerPush}>
                Изменить профиль
              </div>
          ) : null}
          <div>Имя: {user.first_name}</div>
          <div>Фамилия: {user.last_name}</div>
          <div>Электронная почта: {user.email}</div>
          <div>Имя пользователя: {user.username}</div>
          <div>Присоединился на сайт: {moment(user.data_joined).format("D MMMM hh:mm")}</div>
          <div>Последний раз был в сети: {moment(user.last_login).format("D MMMM hh:mm")}</div>
          <div>{user.subscriptions.map(subscription => (
              <div>{subscription}</div>
          ))}</div>
        </div>
      ))}
    </div>
  )
}