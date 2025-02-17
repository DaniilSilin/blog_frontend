import React from 'react'
import DjangoService from '../../../store/services/DjangoService'

import Filter from '../filter'
import PostItem from '../post_page'
import { Post } from '../../../types'
import { useRouter } from 'next/router'

import styles from './post_list.module.css'

const cleanParams = (query, page: number) => {
  const search = query.search ? query.search : undefined
  const before = query.before ? query.before : undefined
  const after = query.after ? query.after : undefined
  const sort_by = query.sort_by ? query.sort_by : undefined

  return { page: page, search: search, sort_by: sort_by, after: after, before: before }
}

export default function PostList() {
  const router = useRouter()
  const [ page, setPage ] = React.useState<number>(1)

  const { data: postPaginatedList, isLoading, isFetching } = DjangoService.useGetPostPaginatedListQuery(cleanParams(router.query, page))

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (postPaginatedList.next != null) {
          setPage(page + 1)
        } else {
          return
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [ page, isFetching ])

  if (isLoading) {
    return <div>Загрузка данных</div>
  }

  return (
    <div className={styles.root}>
      <h1>Публикации</h1>
      <Filter page={page} setPage={setPage} cleanParams={cleanParams(router.query, page)} />
      {postPaginatedList?.results.map((post: Post[], index: number) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  )
}