import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useRouter } from 'next/router'
import 'moment/locale/ru'
import moment from 'moment'

export default function Comment() {
  const router = useRouter()

  const getSlug = React.useMemo(() => {
    return router.asPath.split('/')[2]
  }, [ router ])

  const getPostID = React.useMemo(() => {
    return router.asPath.split('/')[4]
  }, [ router ])

  const getCommentID = React.useMemo(() => {
    return router.asPath.split('/')[6]
  }, [ router ])

  const { data } = DjangoService.useGetCommentQuery({ slug: getSlug, post_id: getPostID, comment_id: getCommentID })
  console.log(data)

  return (
    <div style={{ border: '1px solid gray', padding: '15px', width: '350px' }}>
        <div>Автор комментария: {data?.author}</div>
        <div>Тело комментария: {data?.body}</div>
        <div>Дата создания: {moment(data?.created_at).format("D MMMM YYYY hh:mm")}</div>
    </div>
  )
}