import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './post_list.module.css'

export default function PostPaginatedList() {
  const { data } = DjangoService.useGetPostPaginatedListQuery({ limit: 1 })

  return (
    <div className={styles.root}>
      {data?.map((item) => (
          <div key={item.id} className={styles.postContainer}>
            <div>Название поста: {item.title}</div>
            <div>Автор поста: {item.author}</div>
            <div>Тело поста: {item.body}</div>
            <div>Дата создания: {moment(item.created_at).format("D MMMM hh:mm")}</div>
            <div>Лайкнул ли пользователь: {item.is_published}</div>
            <div>Лайки: {item.likes}</div>
            <div>Просмотры: {item.views}</div>
            <div>Название блога: {item.blog.title}</div>
            <div>{item?.tags && (item?.tags.split(' ')).map((tag, index) => (
                <Link key={index} href={`/blogs/search/?hashtag=${tag.slice(1)}`}>{tag} </Link>
            ))}
            </div>
          </div>
      ))}
    </div>
  )
}