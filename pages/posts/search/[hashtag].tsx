import React from "react";
import MainLayout from "@/app/MainLayout";
import PostsSearchView from "@/app/views/PostsSearch";
import type { GetServerSidePropsContext } from "next";

export default function PostsSearchPage(props) {
  return (
    <MainLayout>
      <PostsSearchView hashtag={props.hashtag} />
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      hashtag: ctx.query.hashtag,
    },
  };
};
