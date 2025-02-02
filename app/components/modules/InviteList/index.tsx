import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './invite_list.module.css'

export default function InviteList() {
  const { data } = DjangoService.useGetInviteListQuery()

  const [ acceptInvite ] = DjangoService.useAcceptInviteMutation()
  const [ rejectInvite ] = DjangoService.useAcceptInviteMutation()

  const acceptInviteFunction = (pk: number) => {
    acceptInvite({ pk })
  }

  const rejectInviteFunction = (pk: number) => {
    rejectInvite({ pk })
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список приглашений</div>
      {data?.map((item, index) => (
        <div key={index} className={styles.inviteContainer}>
          <div>Приглашение от пользователя: {item.admin}</div>
          <div>Приглашение в блог: {item.blog.title}</div>
          <div>Дата приглашения: {moment(item.created_at).format("D MMMM hh:mm")}</div>
          <div>Текст приглашения: {item.description}</div>
          {item.status === null ?
              (<div style={{display: 'flex', marginTop: '10px'}}>
                <div className={styles.acceptInvite} onClick={() => acceptInviteFunction(item.pk)}>
                  Принять
                </div>
                <div className={styles.rejectInvite} onClick={() => rejectInviteFunction(item.pk)}>
                  Отклонить
                </div>
              </div>) :
              (item.status ? (<div className={styles.inviteText}>Вы приняли приглашение</div>) : (<div className={styles.inviteText}>
                Вы отклонили приглашение
              </div>))}
        </div>
      ))}
    </div>
  )
}