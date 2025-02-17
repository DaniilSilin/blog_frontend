import React from 'react'
import Link from 'next/link'
import DjangoService from "@/app/store/services/DjangoService"
import { useAppSelector } from "@/app/store"
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from './is_blog_owner.module.css'

export interface Props {
  blog: any
}

export default function IsBlogOwner({ blog }: Props) {
  const user = useAppSelector(state => state.django.profile)
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()

  const subscribeRequest = () => {
    subscribeBlog({ slug: blog?.slug })
  }

  const unsubscribeRequest = () => {
    unsubscribeBlog({ slug: blog?.slug })
  }

  return (
    <div>
      {blog.owner.username === user.username ? (
        <Link href={`/blog/${blog.slug}/`}>
          <div className={styles.subscribeButton}>Вы создатель блога</div>
        </Link>
      ) : (
      <div>
        {blog?.isSubscribed.toString() === 'true' ? (
          <div className={styles.unsubscribeButton} onClick={unsubscribeRequest}>Отписаться</div>
        ) : (
          <div className={styles.subscribeButton} onClick={subscribeRequest}>Подписаться</div>
        )}
      </div>
      )}
    </div>
  )
}