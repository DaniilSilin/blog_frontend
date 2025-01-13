import React from 'react'
import BlogPosts from '@/app/components/modules/blog_posts'


export default function BlogPostsView({ slug }) {
  return (
    <BlogPosts slug={slug} />
  )
}