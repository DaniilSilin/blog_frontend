import React from "react";
import MainLayout from "@/app/MainLayout";
import PostCreateView from "@/app/views/PostCreate";
import type { GetServerSidePropsContext } from "next";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function PostCreatePage(props) {
  return (
    <MainLayout>
      <PostCreateView slug={props.slug} />
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
