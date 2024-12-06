import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './subscriptions.module.css'

export default function Subscriptions({ username }) {
  const { data } = DjangoService.useGetSubscriptionsQuery({ username })
    console.log(username)

  return (
    <div>
      <div className={styles.title}>Подписки пользователя {username}:</div>
      {data?.map((item, index) => (
        <div key={index}>
          {item?.subscriptions?.map((item, index) => (
            <div key={index} className={styles.subscriptionContainer}>
              <div>Название блога: {item.title}</div>
              <div>SLUG блога: {item.slug}</div>
              <div>Описание блога: {item.description}</div>
              <div>Дата создания блога: {moment(item.created_at).format("D MMMM hh:mm")}</div>
              <div>Дата последнего обновления: {moment(item.updated_at).format("D MMMM hh:mm")}</div>
              <div>Количество постов: {item.count_of_posts}</div>
              <div>Количество комментариев: {item.count_of_commentaries}</div>
              <div>Владелец блога: {item.owner}</div>
              <div>Авторы блога:
              {item.authors.map((item, index) => (
                <div key={index}>
                  <div>{item?.username}</div>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}