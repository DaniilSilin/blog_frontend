import React from "react";
import MainLayout from "@/app/MainLayout";
import PostsSearchView from "@/app/views/PostsSearch";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function PostsSearchPage(props) {
  return (
    <MainLayout>
      <PostsSearchView hashtag={props.hashtag} />
    </MainLayout>
  );
}

const resolveConfig = getConfig([["postsSearch", () => ({ page: 1 })]]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {
        hashtag: ctx.query.hashtag,
      },
    };
  },
);
