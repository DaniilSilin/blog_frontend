import React from 'react'
import EditorMainLayout from "@/app/EditorMainLayout"
import type { GetServerSidePropsContext } from 'next'
import MainLayout from "@/app/MainLayout";
import BlogEditorCommunityView from "@/app/views/BlogEditorCommunityView";
import {getConfig, serverSideResolverWrapper} from "@/app/store/wrapper";

export default function BlogEditorPublications(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorCommunityView slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["blogComments", (ctx) => ({ slug: ctx!.query.slug, page: 1 })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {
        slug: ctx.query.slug,
      },
    }
  },
  results => {
    return false
  }
)
