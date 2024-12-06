import React from 'react'
import Link from "next/link"
import moment from 'moment/moment'
import PostFooter from '../PostFooter'

import { Post } from '../../../../types'
import styles from '../blog_page.module.css'

export interface Props {
    post: Post
    slug: string
}

export default function PostList({ post, slug }: Props) {
  const today = Date.now()

  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitle}>
        <Link className={styles.postLinkTitle} href={`/blog/${slug}/post/${post.post_id}/`}>{post.title}</Link>
      </div>
      <div className={styles.postDate}>
        {moment(post.created_at).diff(today, 'days') < 26 ? moment(post.created_at).format("DD MMMM YYYY hh:mm") : moment(post.created_at).fromNow()}
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