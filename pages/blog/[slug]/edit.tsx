import React from 'react'
import MainLayout from '@/app/MainLayout'
import BlogEditView from "@/app/views/BlogEdit"
import type { GetServerSidePropsContext } from "next"

export default function EditBlogPage(props) {
  return (
    <MainLayout>
      <BlogEditView slug={props.slug} />
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