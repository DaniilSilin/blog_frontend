import React, { ChangeEvent } from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ru'
import {useAppSelector} from "@/app/store";

const BASE_URL = 'http://localhost:8000'

export default function Profile({ username}) {
  const router = useRouter()
  const { data } = DjangoService.useUserProfileQuery({ username })
  const user = useAppSelector(state => state.django.profile)

  const routerPush = React.useCallback(() => {
     router.push({
      pathname: `/profile/${user.username}/edit/`,
    }, undefined, { shallow: false })
  }, [ router ])

  return (
    <div>
      {data?.map(user => (
        <div>
          {/*<div>{user.username}</div>*/}
          <div>{data.username}</div>
          <img src={`${BASE_URL}${user.avatar_small}`} alt='' width={100} height={100} style={{ borderRadius: '50%' }} />
          {user?.username === data?.username ? (
            <div style={{ fontSize: '16px' }} onClick={routerPush}>
              Изменить профиль
            </div>
          ) : null}
          <div>Имя: {user.first_name}</div>
          <div>Фамилия: {user.last_name}</div>
          <div>Электронная почта: {user.email}</div>
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