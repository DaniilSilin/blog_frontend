import React from 'react'
import BlogPostsView from '@/app/views/BlogPosts'
import MainLayout from '@/app/MainLayout'
import type { GetServerSidePropsContext } from 'next'


export default function BlogPostsPage(props) {
  return (
    <MainLayout>
      <BlogPostsView slug={props.slug} />
    </MainLayout>
  )
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      slug: ctx.query.slug
    }
  }
})