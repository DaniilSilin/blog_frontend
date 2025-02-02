import React from 'react'
import EditorMainLayout from "@/app/EditorMainLayout"
import BlogEditorPublicationsView from "@/app/views/BlogEditorPublications"
import type { GetServerSidePropsContext } from 'next'
import MainLayout from "@/app/MainLayout";

export default function BlogEditorPublications(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorPublicationsView slug={props.slug} />
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