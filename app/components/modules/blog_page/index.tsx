import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'
import AdditionalBlogInformation from './AdditionalBlogInformation'
import Image from 'next/image'

import styles from './blog_page.module.css'
import { useAppSelector } from '@/app/store'
import PostItem from "@/app/components/modules/post_page"
import BlogActionMenu from "@/app/components/modules/blog_page/BlogActionMenu"
import { useRouter } from 'next/router'
import classNames from "classnames"
import createBlogMenu from "@/app/components/modules/blog_page/constants"

const BASE_URL = 'http://127.0.0.1:8000/'

export interface Props {
  children: React.ReactNode
  slug: string
}

export default function BlogItem({ slug, children }: Props) {
  const router = useRouter()
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

  const BLOG_MENU = createBlogMenu(slug)

  return (
    <div className={styles.root}>
      <div className={styles.blogContainer}>
          <Image src={blogData?.banner_small ? `${BASE_URL}${blogData?.banner_small}` : '/img/default/banner.jpg'} width={1070} height={180} style={{ borderRadius: '15px' }} alt="" />
          <div style={{ display: 'flex'}}>
            <Image src={blogData?.avatar_small ? `${BASE_URL}${blogData?.avatar_small}` : '/img/default/avatar_default.jpg'} style={{ borderRadius: '50%' }} alt="" width='150' height='150' />
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
        {BLOG_MENU.map((item) => (
          <Link className={classNames(styles.blogMenu, {[styles.active]: router.pathname === item.pathname })} href={item.href}>
            <div>{item.title}</div>
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}

