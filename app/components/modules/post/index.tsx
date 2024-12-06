import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/ru'

import styles from './post_list.module.css'
import Filter from "@/app/components/modules/filter"

export default function PostPaginatedList() {
  const [ searchInput, setSearchInput ] = React.useState<string>('')
  const [ orderList, setOrderList ] = React.useState<string[]>([])
  const [ date, setDate ] = React.useState<[string | null, string | null]>([null, null])

  const { data } = DjangoService.useGetPostPaginatedListQuery({ limit: 1 })
  const [ set_like ] = DjangoService.useSetLikeMutation()
  const [ remove_like ] = DjangoService.useRemoveLikeMutation()

  const setLike = (post_id: number, slug: string) => {
    set_like({post_id, slug})
  }

  const removeLike = (post_id: number, slug: string) => {
    remove_like({ post_id, slug })
  }

  return (
    <div className={styles.root}>
      <Filter date={date} setDate={setDate} searchInput={searchInput} setSearchInput={setSearchInput} orderList={orderList} setOrderList={setOrderList} />
      {data?.map((post) => (
          <div key={post.id} className={styles.postContainer}>
            <div>Название поста: {post.title}</div>
            <div>Автор поста: {post.author}</div>
            <div>Тело поста: {post.body}</div>
            <div>Дата создания: {moment(post.created_at).format("D MMMM hh:mm")}</div>
            <div>
            {post?.isLiked.toString() === 'true' ? (
              <div style={{ fontSize: '16px' }} onClick={() => removeLike(post.post_id, post.blog.slug)}>
                лайкнул
              </div>
            ) : <div onClick={() => setLike(post.post_id, post.blog.slug)}>не лайкнул</div>}</div>
            <div>Лайки: {post.likes}</div>
            <div>Просмотры: {post.views}</div>
            <div>Название блога: {post.blog.title}</div>
            <div>{post?.tags && (post?.tags.split(' ')).map((tag, index) => (
                <Link key={index} href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
            ))}
            </div>
          </div>
      ))}
    </div>
  )
}