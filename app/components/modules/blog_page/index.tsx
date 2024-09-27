import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './blog_page.module.css'

export default function BlogItem({ slug }) {
  const { data } = DjangoService.useGetBlogQuery({ slug })

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.blogTitle}>Блог {data?.title}</div>
          <div className={styles.blogContainer}>
          <div>Название блога: {data?.title}</div>
          <div>SLUG Блога: {data?.slug}</div>
          <div>Описание блога: {data?.description}</div>
          <div>Дата создания: {moment(data?.created_at).format("D MMMM YYYY hh:mm")}</div>
          <div>Дата последнего обновления: {moment(data?.updated_at).format("D MMMM YYYY hh:mm")}</div>
          <div>Количество постов: {data?.count_of_posts}</div>
          <div>Количество комментариев: {data?.count_of_commentaries}</div>
          <div>Владелец блога: {data?.owner}</div>
          <div>Авторы блога:</div>
          <div>{data?.authors.map((item) => (
              <div key={item?.id}>
                <div>{item?.id}</div>
                <div>{item?.username}</div>
              </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}