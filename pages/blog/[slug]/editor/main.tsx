import React from "react";
import EditorMainLayout from "@/app/EditorMainLayout";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";
import BlogEditorMainView from "@/app/views/BlogEditorMain";

export default function BlogEditorInvite(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorMainView slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  );
}

const resolveConfig = getConfig([]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {
        slug: ctx.query.slug,
      },
    };
  },
  (results) => {
    return false;
  },
);
