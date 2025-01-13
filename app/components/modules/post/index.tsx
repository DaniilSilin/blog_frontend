import React, {useMemo} from 'react'
import DjangoService from '../../../store/services/DjangoService'

import Filter from '../filter'
import PostItem from '../post_page'
import { Post } from '../../../types'
import { useRouter } from 'next/router'

import styles from './post_list.module.css'

export interface Props {
  post: Post,
}

const cleanParams = (query, page) => {
  const search = query.search ? query.search : undefined
  const before = query.before ? query.before : undefined
  const after = query.after ? query.after : undefined
  const sort_by = query.sort_by ? query.sort_by : undefined

  return { page: page, search: search, sort_by: sort_by, after: after, before: before }
}

export default function PostPaginatedList() {
  const router = useRouter()
  const [ page, setPage ] = React.useState<number>(1)

  const { data: postPaginatedList, isLoading } = DjangoService.useGetPostPaginatedListQuery(cleanParams(router.query, page))

  if (isLoading) {
    return (
      <div>Загрузка данных</div>
    )
  }

  return (
    <div className={styles.root}>
      <Filter page={page} cleanParams={cleanParams(router.query, page)} />
      {postPaginatedList?.results.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}