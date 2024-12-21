import React from 'react'
import Link from "next/link"
import moment from 'moment/moment'
import PostFooter from './PostFooter'

import { RxDotsHorizontal } from "react-icons/rx"
import { Post } from '../../../../types'
import styles from '../blog_page.module.css'
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
    post: Post
    slug: string
}

export default function PostList({ post, slug }: Props) {
  const [ showMenu, setShowMenu ] = React.useState(false)
  const today = Date.now()
  const [ deletePost ] = DjangoService.useDeletePostMutation()

  const mouseOverHandler = () => {
      setShowMenu(true)
  }

  const mouseLeaveHandler = () => {
      setShowMenu(false)
  }

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.postTitle}>
          <Link className={styles.postLinkTitle} href={`/blog/${slug}/post/${post.post_id}/`}>{post.title}</Link>
          <div onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}><RxDotsHorizontal  />
            {showMenu && (
            <div style={{ display: 'flex' }}>
              <div>Редактировать</div>
              <div>Отключить комментарии</div>
              <div>Удалить пост</div>
            </div>)}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className={styles.postDate}>
          {moment(post.created_at).diff(today, 'days') < 26 ? moment(post.created_at).format("DD MMMM YYYY hh:mm") : moment(post.created_at).fromNow()}
        </div>
        <div style={{ padding: '0 8px', fontWeight: '600' }}>·</div>
        <div><Link style={{ fontWeight: '700' }} href={`/profile/${post?.author.username}`}>{post?.author.username}</Link></div>
      </div>
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: post.body}} />
      <div className={styles.postTags}>
        {post?.tags && (post?.tags.split(' ')).map((tag, index) => (
          <Link key={index} href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
        ))}
        <PostFooter post={post} slug={slug} />
      </div>
    </div>
  )
}