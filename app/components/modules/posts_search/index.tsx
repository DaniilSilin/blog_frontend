import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'
import { useRouter } from "next/router"
import Link from "next/link"

export default function PostsSearch() {
  const router = useRouter()

  const hashtagParam = React.useMemo(() => {
    const hashtag = router.query.hashtag ? router.query.hashtag : undefined
    console.log(hashtag)
    if (hashtag !== undefined) {
      return { hashtag: hashtag }
    } else {
      return { hashtag: undefined }
    }
  }, [ router ])

  const { data } = DjangoService.usePostsSearchQuery(hashtagParam)

  if (!data) {
    return (
        <div>wait for data</div>
    )
  }

  return (
    <div>
      <div>Посты по хэштегу</div>
      {data?.map((item, index) => (
        <div key={index}>
          <div>Название поста: {item.title}</div>
          <div>Автор поста: {item.author}</div>
          <div>Тело поста: {item.body}</div>
          <div>Дата создания поста: {moment(item.created_at).format("D MMMM hh:mm")}</div>
          <div>Количество лайков: {item.likes}</div>
          <div>Количество просмотров: {item.views}</div>
          <div>
            <div>{item?.tags && (item?.tags.split(' ')).map((tag, index) => (
                <Link key={index} href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
            ))}
            </div>
          </div>
       </div>
          ))}
    </div>
  )
}
