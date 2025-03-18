import React from "react";
import MainLayout from "@/app/MainLayout";
import PostView from "@/app/views/Post";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function PostPage(props) {
  return (
    <MainLayout>
      <PostView slug={props.slug} post_id={props.post_id} />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  [
    "postCommentList",
    (ctx) => ({ slug: ctx!.query.slug, post_id: ctx!.query.post_id, page: 1 }),
  ],
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
