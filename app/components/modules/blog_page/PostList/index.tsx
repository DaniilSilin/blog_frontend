import React from 'react'

import { Post } from '../../../../types'
import styles from '../blog_page.module.css'
import PostItem from "@/app/components/modules/post_page";

export interface Props {
    post: Post
}

export default function PostList({ post }: Props) {
  return (
    <div>
      <PostItem post={post} />
    </div>
  )
}