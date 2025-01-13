import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons/lib'
import AdditionalBlogInformation from './AdditionalBlogInformation'
import PostList from "@/app/components/modules/blog_page/PostList"
import { IoIosCheckmark, IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useRouter } from 'next/router'

import styles from './blog_posts.module.css'
import BlogItem from "@/app/components/modules/blog_page"
import PostBody from "@/app/components/modules/post_page/PostBody";
import PostFooter from "@/app/components/modules/post_page/PostFooter";
import PostHeader_1 from "@/app/components/modules/post_page/PostHeader/PostHeader_1";

const SORTING_LIST = [
  {
    id: 1,
    title: 'Сначала новое',
    query_param: 'newest'
  },
  {
    id: 2,
    title: 'Сначала старое',
    query_param: 'oldest',
  }
]

export default function BlogPosts({ slug }) {
  const router = useRouter()

  const { data } = DjangoService.useGetBlogPostsQuery({ slug: slug })
  const sortingPostListRef = React.useRef(null)
  const [ openSortingMenu, setOpenSortingMenu ] = React.useState(false)
  const [ showOwnerMenu, setShowOwnerMenu ] = React.useState(false)
  const [ page, setPage ] = React.useState(1)

  const [ sorting, setSorting ] = React.useState(SORTING_LIST[0].query_param)
  const [ currentTitle, setCurrentTitle ] = React.useState(SORTING_LIST[0].title)
  // const [ currentTitle, setCurrentTitle ] = React.useState(SORTING_LIST[0].title) SORTING_LIST.find(item => item.query_param === sorting ? item.title :

  const sortingMenuHandleChange = React.useCallback((item: any) => {
    setOpenSortingMenu(false)
    if (item.query_param !== sorting) {
      setSortingQueryParam(item)
      setSorting(item.query_param)
      setCurrentTitle(item.title)
      setPage(1)
    }
  }, [ setSorting, setCurrentTitle, setOpenSortingMenu, setPage, sorting ])

  const setSortingQueryParam = React.useCallback((item: any) => {
    setSorting(item.query_param)
     router.push({
      pathname: `/blog/${slug}/`,
      query: { sorting: item.query_param },
    }
    ,undefined, { shallow: true })
  }, [ setSorting, router ])

  const sortingParam = React.useMemo(() => {
    const sorting1 = router.query.sorting ? router.query.sorting : undefined
    if (sorting1) {
     if (sorting1 === 'oldest' || sorting1 === 'newest') {
        return sorting1
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }, [ router ])

  return (
    <div className={styles.root}>
      <BlogItem slug={slug} />

      <div ref={sortingPostListRef}>
        <span className={styles.selectButton}>
          <div className={styles.sortingTitle}>{sortingParam}</div>
          <div>{openSortingMenu ? <IoIosArrowUp size={22} style={{ marginTop: '10px' }} /> : <IoIosArrowDown size={22} style={{ marginTop: '10px' }} />}</div>
        </span>
        {openSortingMenu && (
        <div>
          <div className={styles.sortingMenu}>
            {SORTING_LIST.map((item) => (
            <div key={item.id} className={styles.sortingMenuTitle} onClick={() => sortingMenuHandleChange(item)}>
                {item.title}
                {item.title === sorting && <IoIosCheckmark />}
            </div>
            ))}
          </div>
        </div>
        )}
      </div>

      {data?.results.map((post, index) => (
        <div style={{ border: '1px solid black' }}>
          <PostHeader_1 post={post} />
          <PostBody post={post} />
          <PostFooter post={post} />
        </div>
      ))}
    </div>
  )
}