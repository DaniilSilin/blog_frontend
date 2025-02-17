import React from 'react'
import BlogMain from "@/app/components/modules/blog_main";

export default function BlogView({ slug }) {
  return (
    <BlogMain slug={slug} />
  )
}