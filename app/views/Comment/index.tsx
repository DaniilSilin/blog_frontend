import React from 'react'
import Comment from '@/app/components/modules/comment'


export default function CommentView({ post_id, slug, comment_id }) {
  return (
    <Comment post_id={post_id} slug={slug} comment_id={comment_id} />
  )
}