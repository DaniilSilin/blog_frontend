import React from 'react'
import type { GetServerSidePropsContext } from 'next'
import BlogEdit from "@/app/components/modules/blog_edit";
import EditorMainLayout from "@/app/EditorMainLayout";
import MainLayout from "@/app/MainLayout";

export default function BlogPage(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEdit slug={props.slug} />
      </EditorMainLayout>
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