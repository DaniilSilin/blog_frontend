import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useRouter } from 'next/router'
import 'moment/locale/ru'
import moment from 'moment'

export default function Comment({ post_id, slug, comment_id }) {
  const { data } = DjangoService.useGetCommentQuery({ slug: slug, post_id: post_id, comment_id: comment_id })
  console.log(data)

  return (
    <div style={{ border: '1px solid gray', padding: '15px', width: '350px' }}>
        <div>Автор комментария: {data?.author}</div>
        <div>Тело комментария: {data?.body}</div>
        <div>Дата создания: {moment(data?.created_at).format("D MMMM YYYY hh:mm")}</div>
    </div>
  )
}