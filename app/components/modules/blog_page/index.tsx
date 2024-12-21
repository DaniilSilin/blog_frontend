import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons/lib'
import AdditionalBlogInformation from './AdditionalBlogInformation'
import PostList from "@/app/components/modules/blog_page/PostList"
import { IoIosCheckmark, IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { useRouter } from 'next/router'

import styles from './blog_page.module.css'

const BASE_URL = 'http://localhost:8000'

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

export default function BlogItem({ slug }) {
  const { data: blogData } = DjangoService.useGetBlogQuery({ slug })
  const [ page, setPage ] = React.useState(1)
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()
  const sortingPostListRef = React.useRef(null)
  const [ openSortingMenu, setOpenSortingMenu ] = React.useState(false)
  const router = useRouter()


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

  console.log(sortingParam)
  const [ sorting, setSorting ] = React.useState(sortingParam ? sortingParam : SORTING_LIST[0].query_param)
  console.log(sorting)
  const [ currentTitle, setCurrentTitle ] = React.useState(SORTING_LIST[0].title)
  // SORTING_LIST.find(item => item.query_param === sorting ? item.title :
  const { data: postList, isFetching } = DjangoService.useGetBlogPostsQuery({ slug, page, sorting })

  const setSortingQueryParam = React.useCallback((item: any) => {
    setSorting(item.query_param)
     router.push({
      pathname: `/blog/${slug}`,
      query: { sorting: item.query_param },
    }
    ,undefined, { shallow: true })
  }, [ setSorting, router ])

  const subscribeRequest = () => {
    subscribeBlog({ slug })
  }

  const unsubscribeRequest = () => {
    unsubscribeBlog({ slug })
  }

  const [ dynamicContentModalDisplayed, setDynamicContentModalDisplayed ] = React.useState(false)
  const freezeBody = React.useCallback(() => document.querySelector("body")?.classList.add("freeze"), [])
  const unfreezeBody = React.useCallback(() => document.querySelector("body")?.classList.remove("freeze"), [])

  const handleDynamicContentClick = React.useCallback((e) => {
    let elem = e.target
    if (dynamicContentModalDisplayed) {
      if (elem.className.startsWith('blog_page_close__iM9MY') || elem.className.startsWith('blog_page_modal__2v_9_')) {
        if (elem.className.startsWith('blog_page_close')) {
          elem = elem.parentNode.parentNode.parentNode
          elem.style.display = 'none'
          unfreezeBody()
          setDynamicContentModalDisplayed(false)
        }
        elem.style.display = 'none'
        unfreezeBody()
        setDynamicContentModalDisplayed(false)
      }
    } else {
      let modalNode = null
      if (elem.lastElementChild.className.startsWith('blog_page_modal__2v_9_')) {
        modalNode = elem.lastElementChild
        modalNode.style.display = 'block'
        freezeBody()
        setDynamicContentModalDisplayed(true)
      }
    }
  }, [freezeBody, unfreezeBody, dynamicContentModalDisplayed])

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (sortingPostListRef.current.contains(e.target)) {
        setOpenSortingMenu(true)
      } else {
        setOpenSortingMenu(false)
      }
    }
    document.addEventListener('mousedown', handleMouse)
    return () => document.addEventListener('mousedown', handleMouse)
  })

  const sortingMenuHandleChange = React.useCallback((item: any) => {
    setOpenSortingMenu(false)
    if (item.query_param !== sorting) {
      setSortingQueryParam(item)
      setSorting(item.query_param)
      setCurrentTitle(item.title)
      setPage(1)
    }
  }, [ setSorting, setCurrentTitle, setOpenSortingMenu, setPage, sorting ])

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
          if (postList.next !== null) {
            setPage(page + 1)
          } else {
            return
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return function () {
      document.removeEventListener("scroll", onScroll)
    }
  }, [ page, isFetching ])

  return (
      <div className={styles.root}>
        <div className={styles.blogContainer}>
          <div style={{display: 'flex'}}>
            <img src={`${BASE_URL}${blogData?.avatar}`} alt="" width='60' height='60'/>
            <div style={{justifyContent: 'space-between', display: 'flex', width: '870px'}}>
              <div className={styles.blogInfo}>
                <div className={styles.blogTitle}>{blogData?.title}</div>
                <div>{blogData?.subscriberList} подписчиков</div>
              </div>
              <div>
                {blogData?.isSubscribed.toString() === 'true' ? (
                    <div className={styles.unsubscribeButton} onClick={unsubscribeRequest}>Отписаться</div>
                ) : (
                    <div className={styles.subscribeButton} onClick={subscribeRequest}>Подписаться</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div onClick={handleDynamicContentClick} className={styles.blogDescription}>
                {(blogData?.description.length < 100) ?
                    <>{blogData?.description}<RightOutlined/></> :
                    <>{blogData?.description.slice(0, 130)}...<RightOutlined/></>}
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <AdditionalBlogInformation blogData={blogData}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{fontWeight: '700', fontSize: '18px'}}>Последнее обновление:</div>
            <div style={{marginTop: '2px'}}>&nbsp;{moment(blogData?.updated_at).format("D MMMM YYYY hh:mm")}</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', padding: '4px 8px 4px 0'}}>
              <div style={{fontSize: '18px', fontWeight: '700'}}>{blogData?.count_of_posts}</div>
              <div style={{fontSize: '14px', color: '#7A9199', marginTop: '3.5px'}}>&nbsp;Постов</div>
            </div>
            <div style={{display: 'flex', padding: '4px 8px'}}>
              <div style={{fontSize: '18px', fontWeight: '700'}}>{blogData?.count_of_commentaries}</div>
              <div style={{fontSize: '14px', color: '#7A9199', marginTop: '3.5px'}}>&nbsp;Комментариев</div>
            </div>
          </div>
        </div>
        <div ref={sortingPostListRef}>
          <span className={styles.selectButton}>
            <div className={styles.sortingTitle}>{currentTitle}</div>
            <div>{openSortingMenu ? <IoIosArrowUp size={22} style={{ marginTop: '10px' }} /> : <IoIosArrowDown size={22} style={{ marginTop: '10px' }} />}</div>
          </span>
            {openSortingMenu && (
                <div className={styles.sortingMenu}>
                  {SORTING_LIST.map((item) => (
                      <div key={item.id} className={styles.sortingMenuTitle} onClick={() => sortingMenuHandleChange(item)}>
                        {item.title}
                        {item.title === sorting && <IoIosCheckmark />}
                      </div>
                  ))}
                </div>
            )}
        </div>
        <div className={styles.postsContainer}>
          {postList?.results?.map((post, index) => (
              <PostList post={post} slug={slug}/>
          ))}
        </div>
      </div>
  )
}