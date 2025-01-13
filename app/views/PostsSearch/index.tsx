import React from 'react'
import PostsSearch from "@/app/components/modules/posts_search";

export default function PostsSearchView({ hashtag }) {
  return (
    <div>
      <PostsSearch hashtag={hashtag} />
    </div>
  )
}