import React from 'react'
import PostPg from "@/app/components/modules/post/post_page";


export default function PostView({ slug, post_id }) {
  return (
    <PostPg slug={slug} post_id={post_id} />
  )
}