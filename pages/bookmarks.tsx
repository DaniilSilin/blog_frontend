import React from "react";
import MainLayout from "../app/MainLayout";
import BookmarkedPostListView from "@/app/views/BookmarkedPostList";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BookmarksPage() {
  return (
    <MainLayout>
      <BookmarkedPostListView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["bookmarkedPostList", () => ({ page: 1 })],
  ["subscriptionListMini"],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
