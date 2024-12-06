import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import moment from 'moment'
import 'moment/locale/ru'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons/lib'
import AdditionalBlogInformation from './AdditionalBlogInformation'
import PostList from "@/app/components/modules/blog_page/PostList"

import styles from './blog_page.module.css'

const BASE_URL = 'http://localhost:8000'

export default function BlogItem({ slug }) {
  const { data: blogData } = DjangoService.useGetBlogQuery({ slug })
  const [ page, setPage ] = React.useState(1)
  const { data: postList, isFetching } = DjangoService.useGetBlogPostsQuery({ slug, page })
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()
  console.log(postList)

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
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (postList.next === null) {
          return
        }
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <div className={styles.root}>
        <div className={styles.blogContainer}>
          <div style={{ display: 'flex' }}>
            <img src={`${BASE_URL}${blogData?.avatar}`} alt="" width='60' height='60' />
            <div style={{ justifyContent: 'space-between', display: 'flex', width: '870px' }}>
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
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ fontWeight: '700', fontSize: '18px' }}>Последнее обновление:</div>
              <div style={{ marginTop: '2px' }}>&nbsp;{moment(blogData?.updated_at).format("D MMMM YYYY hh:mm")}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', padding: '4px 8px 4px 0' }}>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>{blogData?.count_of_posts}</div>
                <div style={{ fontSize: '14px', color: '#7A9199', marginTop: '3.5px' }}>&nbsp;Постов</div>
              </div>
              <div style={{ display: 'flex', padding: '4px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>{blogData?.count_of_commentaries}</div>
                <div style={{ fontSize: '14px', color: '#7A9199', marginTop: '3.5px' }}>&nbsp;Комментариев</div>
              </div>
            </div>
          </div>
        </div>
      <div className={styles.postsContainer}>
        {postList?.results?.map((post, index) => (
           <PostList post={post} slug={slug}/>
        ))}
      </div>
    </div>
  )
}