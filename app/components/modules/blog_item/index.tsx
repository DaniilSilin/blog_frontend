import React from 'react'
import { RxDotsHorizontal } from "react-icons/rx"
import Blog from '../../../types'
import moment from 'moment'
import { FaSquareOdnoklassniki } from "react-icons/fa6"
import { ImTelegram, ImVk } from "react-icons/im"
import Link from 'next/link'

import styles from './blog_item.module.css'
import DjangoService from "@/app/store/services/DjangoService"

export interface Props {
  blog: Blog
}

const BASE_URL = 'http://localhost:8000'

export default function BlogItem({ blog }: Props) {
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()

  const subscribeRequest = () => {
    subscribeBlog({ slug: blog?.slug })
  }

  const unsubscribeRequest = () => {
    unsubscribeBlog({ slug: blog?.slug })
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Link href={`/blog/${blog.slug}/`}>
              <img className={styles.blogAvatar} src={`${BASE_URL}${blog?.avatar_small}`} alt='' width={38} height={38} />
            </Link>
            <div>
              <Link className={styles.blogTitle} href={`/blog/${blog.slug}/`}>
                <div>{blog?.title}</div>
              </Link>
              <div>{blog?.subscriberList} подписчиков</div>
            </div>
          </div>
          <div>
            {blog?.isSubscribed.toString() === 'true' ? (
              <div className={styles.unsubscribeButton} onClick={unsubscribeRequest}>Отписаться</div>
            ) : (
              <div className={styles.subscribeButton} onClick={subscribeRequest}>Подписаться</div>
            )}
          </div>
        </div>
      </div>
      <div>{blog.description}</div>
      <div>
          <div style={{display: 'flex'}}>
            <div style={{fontWeight: '700', fontSize: '18px'}}>Последнее обновление:</div>
            <div style={{marginTop: '2px'}}>&nbsp;{moment(blog?.updated_at).format("D MMMM YYYY hh:mm")}</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', padding: '4px 8px 4px 0'}}>
              <div style={{fontSize: '18px', fontWeight: '700'}}>{blog?.count_of_posts}</div>
              <div style={{fontSize: '14px', color: '#7A9199', marginTop: '3.5px'}}>&nbsp;Постов</div>
            </div>
            <div style={{display: 'flex', padding: '4px 8px'}}>
              <div style={{fontSize: '18px', fontWeight: '700'}}>{blog?.count_of_commentaries}</div>
              <div style={{fontSize: '14px', color: '#7A9199', marginTop: '3.5px'}}>&nbsp;Комментариев</div>
            </div>
          </div>
      </div>
      <div style={{ display: 'flex' }}>
        Соцсети:
        <div>
          <Link href={`${blog?.vk_link}`}>
            <ImVk size={20} />
          </Link>
        </div>
        <div>
          <Link href={`${blog?.tg_link}`}>
            <ImTelegram size={20} />
          </Link>
        </div>
        <div>
          {blog?.youtube_link}
        </div>
        <div>
          {blog?.ok_link}
        </div>
      </div>
    </div>
  )
}