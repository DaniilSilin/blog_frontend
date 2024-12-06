import React from 'react'
import BlogView from '@/app/views/Blog'
import MainLayout from '@/app/MainLayout'
import type { GetServerSidePropsContext } from 'next'

export default function BlogPage(props) {
  return (
    <MainLayout>
      <BlogView slug={props.slug} />
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