import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useRouter } from 'next/router'
import BlogItem from "@/app/components/modules/blog_page"
import PostItem from "@/app/components/modules/post_page"

import styles from './blog_posts.module.css'
import SortingBlogPosts from "@/app/components/modules/blog_posts/SortingBlogPosts"

const cleanParams = (queryParams: any, page: number, slug: string) => {
  const sorting = queryParams.sorting ? queryParams.sorting : undefined
  const search = queryParams.search ? queryParams.search : undefined

  return { sorting: sorting, search: search, slug: slug, page: page }
}

export default function BlogPosts({ slug }) {
  const router = useRouter()
  const [ page, setPage ] = React.useState(1)
  const { data: blogPosts, isFetching } = DjangoService.useGetBlogPostsQuery(cleanParams(router.query, page, slug))

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
        if (blogPosts.next != null) {
          setPage(page + 1)
        } else {
          return
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [ page, blogPosts ])


  return (
    <div className={styles.root}>
      <BlogItem slug={slug}>
        {blogPosts.count > 0 ? (
          <>
            <SortingBlogPosts page={page} setPage={setPage} cleanParams={cleanParams(router.query, page, slug)} slug={slug} />
            <div>
            {blogPosts?.results.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
            </div>
          </>
        ) : (
            <h1>Содатель Блога не разметил ни одной записи в своём блоге</h1>
        )}
      </BlogItem>
    </div>
  )
}