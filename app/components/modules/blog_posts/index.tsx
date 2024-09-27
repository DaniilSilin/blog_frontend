import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useRouter } from 'next/router'

import styles from './blog_posts.module.css'

export default function BlogPosts() {
  const router = useRouter()

  const slug = React.useMemo(() => {
    return router.asPath.split('/')[2]
  }, [ router ])

  const { data } = DjangoService.useGetBlogPostsQuery({ slug: slug })
  console.log(data)

  return (
    <div className={styles.root}>
      <div className={styles.title}>Посты блога</div>
      {data?.map((item, index) => (
        <div key={index} className={styles.postContainer}>
          <div>Название поста: {item.title}</div>
          <div>Тело поста: {item.body}</div>
          <div>Дата создания поста: {item.created_at}</div>
          <div>Лайки: {item.likes}</div>
          <div>Просмотры: {item.views}</div>
          <div>Название Блога: {item.blog.title}</div>
        </div>
      ))}
    </div>
  )
}