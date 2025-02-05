import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons/lib'
import AdditionalBlogInformation from './AdditionalBlogInformation'
import PostList from "@/app/components/modules/blog_page/PostList"
import { useRouter } from 'next/router'

import styles from './blog_page.module.css'
import { useAppSelector } from '@/app/store'
import PostItem from "@/app/components/modules/post_page"
import BlogActionMenu from "@/app/components/modules/blog_page/BlogActionMenu";

const BASE_URL = 'http://localhost:8000'


export default function BlogItem({ slug }) {
  const { data: blogData } = DjangoService.useGetBlogQuery({ slug })
  const user = useAppSelector(state => state.django.profile)
  const [ hasAccess, setHasAccess ] = React.useState(false)

  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      setHasAccess(false)
    } else {
      const access = user.username === blogData?.owner.username || user.is_admin.toString() === 'true'
      setHasAccess(access)
    }
  }, [ blogData, user, setHasAccess ])
  console.log(hasAccess)

  const [ dynamicContentModalDisplayed, setDynamicContentModalDisplayed ] = React.useState(false)
  const freezeBody = React.useCallback(() => document.querySelector("body")?.classList.add("freeze"), [])
  const unfreezeBody = React.useCallback(() => document.querySelector("body")?.classList.remove("freeze"), [])

  const handleDynamicContentClick = React.useCallback((e) => {
    let elem = e.target
    if (dynamicContentModalDisplayed) {
      if (elem.className.startsWith("close_3") || elem.className.startsWith("modal_3")) {
        if (elem.className.startsWith("close_3")) {
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
      if (elem.lastElementChild.className.startsWith("modal_3")) {
        modalNode = elem.lastElementChild
        modalNode.style.display = 'block'
        freezeBody()
        setDynamicContentModalDisplayed(true)
      }
    }
  }, [freezeBody, unfreezeBody, dynamicContentModalDisplayed])

  // React.useEffect(() => {
  //   const handleMouse = (e: MouseEvent) => {
  //     if (sortingPostListRef.current.contains(e.target)) {
  //       setOpenSortingMenu(true)
  //     } else {
  //       setOpenSortingMenu(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', handleMouse)
  //   return () => document.addEventListener('mousedown', handleMouse)
  // })

  // const sortingMenuHandleChange = React.useCallback((item: any) => {
  //   setOpenSortingMenu(false)
  //   if (item.query_param !== sorting) {
  //     setSortingQueryParam(item)
  //     setSorting(item.query_param)
  //     setCurrentTitle(item.title)
  //     setPage(1)
  //   }
  // }, [ setSorting, setCurrentTitle, setOpenSortingMenu, setPage, sorting ])

  // React.useEffect(() => {
  //   const onScroll = () => {
  //     const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
  //     if (scrolledToBottom && !isFetching) {
  //         if (postList.next !== null) {
  //           setPage(page + 1)
  //         } else {
  //           return
  //       }
  //     }
  //   }
  //   document.addEventListener("scroll", onScroll)
  //   return function () {
  //     document.removeEventListener("scroll", onScroll)
  //   }
  // }, [ page, isFetching ])

  return (
    <div className={styles.root}>
      <div className={styles.blogContainer}>
          <img src={`${BASE_URL}${blogData?.banner}`} width={1070} height={180} style={{ borderRadius: '15px' }} alt="" />
          <div style={{ display: 'flex'}}>
            <img src={`${BASE_URL}${blogData?.avatar_small}`} style={{ borderRadius: '50%' }} alt="" width='150' height='150' />
            <div style={{ justifyContent: 'space-between', display: 'flex', width: '870px' }}>
              <div className={styles.blogInfo}>
                <div className={styles.blogTitle}>{blogData?.title}</div>
                <div style={{ display: 'flex' }}>
                  <div>{blogData?.slug}</div>
                  <div style={{ margin: '0 4px' }}>·</div>
                  <div>{blogData?.subscriberList} подписчиков</div>
                  <div style={{ margin: '0 4px' }}>·</div>
                  <div>{blogData?.count_of_posts} постов</div>
                </div>
                <div></div>
                <div onClick={handleDynamicContentClick} className={styles.blogDescription}>
                  {(blogData?.description.length < 35) ?
                    <>{blogData?.description}...ещё</> :
                    <>{blogData?.description.slice(0, 35)}...ещё</>}
                  <div className={"modal_3"}>
                    <div className={"modalContent_3"}>
                      <AdditionalBlogInformation blogData={blogData}/>
                    </div>
                  </div>
                </div>
                <div>
                  <BlogActionMenu hasAccess={hasAccess} blogData={blogData} slug={slug} />
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className={styles.bottomMenu}>
        <Link style={{ fontSize: '22px', marginRight: '10px' }} href={`/blog/${slug}/`}>
          <div>Главная</div>
        </Link>
        <Link style={{ fontSize: '22px', marginRight: '10px' }} href={`/blog/${slug}/posts/`}>
          <div>Посты</div>
        </Link>
        <Link style={{ fontSize: '22px', marginRight: '10px' }} href={`/blog/${slug}/videos/`}>
          <div>Видео</div>
        </Link>
        <Link style={{ fontSize: '22px', marginRight: '10px' }} href={`/blog/${slug}/playlists/`}>
          <div>Плейлисты</div>
        </Link>
        <Link style={{ fontSize: '22px', marginRight: '10px' }} href={`/blog/${slug}/community/`}>
          <div>Обсуждения</div>
        </Link>
      </div>
      {blogData?.pinned_post && (
        <div>
          <PostItem post={blogData?.pinned_post} />
        </div>
      )}
    </div>
  )
}

