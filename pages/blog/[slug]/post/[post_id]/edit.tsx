import React from "react";
import MainLayout from "@/app/MainLayout";
import type { GetServerSidePropsContext } from "next";
import PostEditView from "@/app/views/PostEdit";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function PostPage(props: any) {
  return (
    <MainLayout>
      <PostEditView slug={props.slug} post_id={props.post_id} />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  [
    "getPost",
    (ctx) => ({ slug: ctx!.query.slug, post_id: ctx!.query.post_id }),
  ],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {
        slug: ctx.query.slug,
        post_id: ctx.query.post_id,
      },
    };
  },
  (results) => {
    return false;
  },
);
