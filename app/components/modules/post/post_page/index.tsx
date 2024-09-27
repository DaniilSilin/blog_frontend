import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'

export default function PostPg({ slug, post_id }) {
  const [ tags, setTags ] = React.useState([])
  const { data } = DjangoService.useGetPostQuery({ slug, post_id })
  console.log(data)

  React.useEffect(() => {
    setTags(data?.tags.split(' '))
  }, [ data ])

  return (
    <div>
      <div style={{ fontSize: '28px' }}>Блог: {data?.title}</div>
      <div>Название поста: {data?.title}</div>
      <div>Автор поста: {data?.author}</div>
      <div>Дата создания: {data?.created_at}</div>
      <div>Тело поста: {data?.body}</div>
      <div>Лайки: {data?.likes}</div>
      <div>Просмотры: {data?.views}</div>
      <div>{data?.blog.title}</div>
      <div>{tags?.map((tag) => (
        <Link href={`/blogs/search/?hashtag=${tag.slice(1)}`}>{tag} </Link>
      ))}</div>
    </div>
  )
}