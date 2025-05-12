import React from "react";
import EditorMainLayout from "@/app/EditorMainLayout";
import MainLayout from "@/app/MainLayout";
import BlogEditorInviteView from "@/app/views/BlogEditorInvite";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BlogEditorInvite(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorInviteView slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["blogAuthors", (ctx) => ({ slug: ctx!.query.slug })],
  ["getUsers", (ctx) => ({ slug: ctx!.query.slug })],
  ["blogInvitations", (ctx) => ({ slug: ctx!.query.slug })],
]);

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
