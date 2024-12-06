import React from 'react'
import MainLayout from '@/app/MainLayout'
import type { GetServerSidePropsContext } from 'next'
import BlogEditorPublicationsView from "@/app/views/BlogEditorPublications"

export default function BlogEditorPublicationsPage(props) {
  return (
    <MainLayout>
      <BlogEditorPublicationsView slug={props.slug} />
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