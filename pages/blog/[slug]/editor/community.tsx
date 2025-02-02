import React from 'react'
import EditorMainLayout from "@/app/EditorMainLayout"
import type { GetServerSidePropsContext } from 'next'
import MainLayout from "@/app/MainLayout";
import BlogEditorCommunityView from "@/app/views/BlogEditorCommunityView";

export default function BlogEditorPublications(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorCommunityView slug={props.slug} />
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