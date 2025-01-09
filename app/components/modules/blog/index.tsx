import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Filter from '../filter'
import Blog from '../../../types'
import { useRouter } from 'next/router'

import styles from './blog.module.css'
import BlogItem from "@/app/components/modules/blog_item"

const cleanQuery = (queryParams) => {
  const search = queryParams.search ? queryParams.search : undefined


  return { search: search }
}

export default function BlogList({ blog }: Props) {
  const router = useRouter()
  const [ page, setPage ] = React.useState<number>(1)
  const { data: blogPaginatedList } = DjangoService.useGetBlogPaginatedListQuery(cleanQuery(router.query))

  return (
    <div className={styles.root}>
      <Filter page={page} cleanQuery={cleanQuery} />
       {blogPaginatedList?.results.map((blog: Blog[]) => (
         <BlogItem key={blog.id} blog={blog} />
       ))}
    </div>
  )
}