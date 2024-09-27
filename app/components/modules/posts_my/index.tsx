import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './posts_my.module.css'

export default function PostsMy() {
  const { data } = DjangoService.useGetMyPostsQuery()
  console.log(data)

  return (
    <div className={styles.root}>
      <div className={styles.title}>Мои посты</div>
      {data?.map((item, index) => (
        <div key={index} className={styles.postContainer}>
          <div>Название поста: {item.title}</div>
          <div>Автор поста: {item.author}</div>
          <div>Тело поста: {item.body}</div>
          <div>Дата создания поста: {moment(item.created_at).format("D MMMM hh:mm")}</div>
          <div>Количество лайков: {item.likes}</div>
          <div>Количество просмотров: {item.views}</div>
        </div>
      ))}
    </div>
  )
}